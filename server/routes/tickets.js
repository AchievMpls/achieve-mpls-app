var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/:year', function(req, res) {
  var year = parseInt(req.params.year);
  var arrayToSend = [];
  if (req.isAuthenticated()) {
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

module.exports = router;
