var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/:year', function(req, res) {
  var year = parseInt(req.params.year);
  var arrayToSend = [];
  if (req.isAuthenticated() && req.user.role === "admin") {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('SELECT "form_responses"."user_id", "form_responses"."event_id", "form_responses"."date_form_completed", "users"."fname", "users"."lname", "users"."session_id", "users"."session_count", "users"."year", "sessions"."grade", "sessions"."facilitator", "sessions"."school", "sessions"."start_time", array_to_json(array_agg(row_to_json((SELECT d FROM (SELECT "question", "answer") d)))) AS "response" FROM "form_responses" JOIN "users" ON "form_responses"."user_id"="users"."id" JOIN "sessions" ON "sessions"."id"="users"."session_id" WHERE "users"."year"=$1 GROUP BY "form_responses"."user_id", "form_responses"."event_id", "form_responses"."date_form_completed", "users"."fname", "users"."lname", "users"."session_id", "users"."session_count", "users"."year", "sessions"."grade", "sessions"."facilitator", "sessions"."school", "sessions"."start_time";', [year],
          function(queryError, result) {
            done();
            if (queryError) {
              res.sendStatus(500);
            } else {
              console.log('result of the crazy query is ', result.rows);
              res.send(result.rows);
            }
          });
      }
    });
  } else {
    res.sendStatus(401);
  }
}); //end router.get

router.post('/filteredtickets/', function(req, res) {
  var session_id = req.body.session_id;
  var user_id = req.body.user_id;
  var paramArray = req.body.ratingsTruthyArray;
  var blingParamCountArray = [];
  var q1BlingArrayOffset = 0;
  var q1BlingArrayLimit = 0;

  //adds session & coach to parameter array, if the user added them to the filter
  if (user_id) {
    paramArray.unshift(user_id);
    q1BlingArrayOffset++;
    q1BlingArrayLimit++;
  }
  if (session_id) {
    paramArray.unshift(session_id);
    q1BlingArrayOffset++;
    q1BlingArrayLimit++;
  }

  //constructs array of parameter references to be used in SQL query
  for (var i = 1; i <= (paramArray.length - q1BlingArrayLimit); i++) {
    blingParamCountArray.push('$' + (i + q1BlingArrayOffset));
  }
  if (req.isAuthenticated() && req.user.role === "admin") {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        //creates query based on which filter-parameters were selected on the client
        var query;
        if (session_id && !user_id) {
          query = 'SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id"="users"."id" WHERE "session_count"=$1 AND "q1_answer" IN (' + blingParamCountArray.join(',') + ');';
        } else if (user_id && !session_id) {
          query = 'SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id"="users"."id" WHERE "user_id"=$1 AND "q1_answer" IN (' + blingParamCountArray.join(',') + ');';
        } else if (user_id && session_id) {
          query = 'SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id"="users"."id" WHERE "session_count"=$1 AND "user_id"=$2 AND "q1_answer" IN (' + blingParamCountArray.join(',') + ');';
        } else {
          query = 'SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id" ="users"."id" WHERE "q1_answer" IN (' + blingParamCountArray.join(',') + ');';
        }
        db.query(query, paramArray,
          function(queryError, result) {
            done();
            if (queryError) {
              res.sendStatus(500);
            } else {
              res.send(result.rows);
              q1BlingArrayLimit = 0;
              q1BlingArrayOffset = 0;
            }
          });
      } //end outer else
    });
  } else {
    res.sendStatus(401);
  }
}); //end router.get

module.exports = router;
