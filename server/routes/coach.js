var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

/**
* @desc get statement that's called in the CoachService controller.
* @param the username gets sent thought (name@email.com)
* @return the tickets associated with that username should be sent back.
*/
router.get('/tickets/:userSession/:userID', function(req, res) {
  var session_id = req.params.userSession;
  var user_id = req.params.userID;
  var today = new Date();
  console.log('the session to get tickets for is: ', session_id, " and date is: ", today, "and user is: ", user_id);
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('SELECT * FROM "forms" JOIN "events" ON "forms"."id" ="events"."form_id" WHERE "session_id"= $1 AND "date_form_open" < $2 AND "date_form_close" > $2 ORDER BY "date_form_close" ASC',
      //@TODO: remove user_id
      [session_id, today],
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
});//end router.get

router.post('/completedTicket', function(req, res) {
  var dateToday = new Date();
  var user_id = req.body.user_id;
  var event_id = req.body.event_id;
  var answers = [null, null, null, null, null];
  for (var i = 0; i < req.body.answers.length; i++) {
    answers[i] = req.body.answers[i];
  }
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ($1,$2,$3,$4,$5,$6,$7,$8);',
      [user_id, event_id, dateToday, answers[0], answers[1], answers[2], answers[3], answers[4]],
        function(queryError, result) {
          done();
          if (queryError) {
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
    }
  });
}); //end router.post


module.exports = router;
