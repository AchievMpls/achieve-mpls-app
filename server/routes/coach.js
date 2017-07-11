var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');
var incompleteTicketArray = [];
/**
 * @desc get statement that's called in the CoachService controller.
 * @param the username gets sent thought (name@email.com)
 * @return the tickets associated with that username should be sent back.
 */
router.get('/tickets/:userSession/:userID', function(req, res) {
  var session_id = req.params.userSession;
  var user_id = req.params.userID;
  var today = new Date();
  var ticketsToSend = [];
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('SELECT * FROM "events" WHERE "session_id"= $1 AND "date_form_open" <= $2 AND "date_form_close" > $2 ORDER BY "date_form_close" ASC;', [session_id, today],
          function(queryError, result) {
            if (queryError) {
              res.sendStatus(500);
            } else {
              var openEvents = result.rows;
              db.query('SELECT * FROM "form_responses" WHERE "user_id"= $1;', [user_id],
                function(queryError, result) {
                  if (queryError) {
                    res.sendStatus(500);
                  } else {
                    var completedTickets = [];
                    result.rows.forEach(function(_result) {
                      completedTickets.push(_result.event_id);
                    });
                    findUniqueTickets(completedTickets, openEvents);
                    console.log('incompleteTicketArray ', incompleteTicketArray[0].form_id);
                    db.query('SELECT "forms".*, row_to_json("questions".*) as "questions" FROM "forms" INNER JOIN "questions" ON ("forms"."id"="questions"."form_id") WHERE "forms"."id"=$1 ORDER BY "questions"."id" ASC;',
                     [incompleteTicketArray[0].form_id],
                        function(queryError, result) {
                          console.log('result of query is ', result);
                          if (queryError) {
                            done();
                            res.sendStatus(500);
                          } else {
                            var resultArray = result.rows;
                            var objectNameArray = [];
                            var dataToSend = [];
                            resultArray.forEach(function(form) {
                              if (objectNameArray.includes(form.form_name)) {} else {
                                objectNameArray.push(form.form_name);
                              }
                            });

                            objectNameArray.forEach(function(form) {
                              var newForm = {
                                form_id: '',
                                form_name: form,
                                questions: []
                              };
                              resultArray.forEach(function(formQuestions) {
                                if (newForm.form_name === formQuestions.questions.form_name) {
                                  newForm.form_id = formQuestions.id;
                                  var _question = {
                                    question_id: formQuestions.questions.id,
                                    question: formQuestions.questions.question
                                  };
                                  (newForm.questions).push(_question);
                                }
                              });
                              dataToSend.push(newForm);
                            });
                            res.send(dataToSend);
                          }
                        });
                  }
                });
            }
          });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

/**
 * @function find unique tickets
 * @desc compares two arrays of tickets and pushes the unique tickets into a new arrays
 * @param array of completed and array of open
 * @return unique items are pushed into the global {array} incompleteTicketArray
 */
var findUniqueTickets = function(completed, open) {
  incompleteTicketArray.length = 0;
  open.forEach(function(ticket) {
    if (completed.includes(ticket.id)) {} else {
      incompleteTicketArray.push(ticket);
    }
  });
  return incompleteTicketArray;
};


router.post('/completedTicket', function(req, res) {
  var dateToday = new Date();
  var user_id = req.body.user_id;
  var event_id = req.body.event_id;
  var answers = [null, null, null, null, null];
  for (var i = 0; i < req.body.answers.length; i++) {
    answers[i] = req.body.answers[i];
  }

  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('INSERT INTO "form_responses" ("user_id", "event_id", "date_form_completed", "q1_answer", "q2_answer", "q3_answer", "q4_answer", "q5_answer") VALUES ($1,$2,$3,$4,$5,$6,$7,$8);', [user_id, event_id, dateToday, answers[0], answers[1], answers[2], answers[3], answers[4]],
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
  } else {
    res.sendStatus(401);
  }
}); //end router.post


module.exports = router;
