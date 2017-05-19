var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/:year', function(req, res) {
  var year = parseInt(req.params.year);
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id" ="users"."id" WHERE "year" = $1;', [year],
        function(queryError, result) {
          done();
          if (queryError) {
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
    }
  });
}); //end router.get

router.post('/filteredtickets/', function(req, res) {
  console.log('on server, you got: ', req.body);
  var session_id = req.body.session_id;
  var user_id = req.body.user_id;
  var paramArray = req.body.ratingsTruthyArray;
  console.log("sess: ", session_id, " and user: ", user_id, " and ratings: ", paramArray);
  var q1BlingArrayOffset = 0;
  var q1BlingArrayLimit = 0;

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

  console.log('here the params: ', paramArray);
  var blingParamCountArray = [];
  for (var i = 1; i <= (paramArray.length-q1BlingArrayLimit); i++) {
    blingParamCountArray.push('$' + (i+q1BlingArrayOffset));
  }
  console.log('and here the blingarray: ', blingParamCountArray);

  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('error connecting: ', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      var query;
      if (session_id && !user_id) {
        query = 'SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id"="users"."id" WHERE "session_count"=$1 AND "q1_answer" IN (' + blingParamCountArray.join(',') + ');';
      }
      else if (user_id && !session_id) {
        query = 'SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id"="users"."id" WHERE "user_id"=$1 AND "q1_answer" IN (' + blingParamCountArray.join(',') + ');';
      }else if (user_id && session_id) {
        query = 'SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id"="users"."id" WHERE "session_count"=$1 AND "user_id"=$2 AND "q1_answer" IN (' + blingParamCountArray.join(',') + ');';
      } else {
        query = 'SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id" ="users"."id" WHERE "q1_answer" IN (' + blingParamCountArray.join(',') + ');';
      }
      db.query(query, paramArray,
        function(queryError, result) {
          done();
          if (queryError) {
            console.log('error querying: ', queryError);
            res.sendStatus(500);
          } else {
            console.log('here the query result: ', result.rows);
            res.send(result.rows);
            q1BlingArrayLimit = 0;
            q1BlingArrayOffset = 0;
          }
        });
    } //end outer else
  });
}); //end router.get

module.exports = router;
