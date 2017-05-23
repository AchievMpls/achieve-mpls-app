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
  //@TODO: remove user_id along route; it's vestigial
  var session_id = req.params.userSession;
  var user_id = req.params.userID;
  var today = new Date();
  console.log('the session to get tickets for is: ', session_id, " and date is: ", today, "and user is: ", user_id);

  // 1. query events for the event ID's from all events that (1) are open and (2) are from the session that the user belongs to.
          // 'SELECT "id" FROM "events" WHERE WHERE "session_id"= $1 AND "date_form_open" < $2 AND "date_form_close" > $2'
          // [session_id, today]
  // 2. map the returned array of objects to an array of numbers.
          //var eventIDarray = result.rows.map(function(obj) {
          //    var value;
          //    value = obj.id;
          //    return value;
          // });
  // 3. in a for loop (?) select (from form_responses) all rows that match the user_id AND event_id (i.e. whether the user has already completed the post)
          // 'SELECT * FROM "form_responses" WHERE "event_id" = $1 AND "user_id" = $2;'
          // [eventIDarray[i], user_id]
      // 4. positive? repeat 3, with the next event ID in the array.
      // 5. negative? select the form associated with that event ID, and send to client.

  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('SELECT * FROM "forms" JOIN "events" ON "forms"."id" ="events"."form_id" JOIN "form_responses" ON "events"."id"="form_responses"."event_id" WHERE "session_id"= $1 AND "date_form_open" < $2 AND "date_form_close" > $2 AND "user_id" = $3 ORDER BY "date_form_close" ASC;',
      [session_id, today, user_id],
      function(queryError, result) {
        done();
        if (queryError) {
          console.log('error selecting: ', queryError);
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
