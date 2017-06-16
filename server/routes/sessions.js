var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/years', function(req, res) {
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('SELECT DISTINCT "year" from "sessions" ORDER BY "year" ASC;',
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
  } else {
    res.sendStatus(401);
  }
});//end router.get

router.get('/:year', function(req, res) {
  var year = req.params.year;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('SELECT * from "sessions" WHERE "year" = $1 ORDER BY "session_count" ASC;',
        [year],
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
  } else {
    res.sendStatus(401);
  }
});//end router.get


router.post('/add', function(req, res) {
  console.log('log in post path ', req.body);
  var year = req.body.year;
  var eventsToAdd = req.body.eventsToAdd;
  var session_count = req.body.session_count;
  var grade = req.body.grade;
  var facilitator = req.body.facilitator;
  var day = req.body.day;
  var start_time = req.body.start_time;
  var school = req.body.school;
  var newSessionID;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        //creates new session
        db.query('INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ($1,$2,$3,$4,$5,$6,$7);',
        [year, session_count, grade, facilitator, day, start_time, school],
          function(queryError, result) {
            done();
            if (queryError) {
              res.sendStatus(500);
            } else {
              //gets id of new session
              db.query('SELECT * from "sessions" WHERE "year" = $1 AND "session_count" = $2',
              [year, session_count],
              function(queryError, result) {
                done();
                if (queryError) {
                  res.sendStatus(500);
                } else {
                  newSessionID = result.rows[0].id;
                  //creates as many [events to be associated with new session]
                  // as were specified by user
                  for (var i = 0; i < eventsToAdd; i++) {
                    db.query('INSERT INTO "events" ("session_id", "meeting_count", "form_id") VALUES ($1, $2, $3);',
                    [newSessionID, i+1, 1],
                    function(queryError, result) {
                      done();
                      if (queryError) {
                        res.sendStatus(500);
                      }
                    });
                  }
                  res.sendStatus(201);
                }
              });
            }
          });
      }
    });
  } else {
    res.sendStatus(401);
  }
}); //end router.post


router.put('/update', function(req, res) {
  var id = req.body.id;
  var session_count = req.body.session_count;
  var grade = req.body.grade;
  var facilitator = req.body.facilitator;
  var day = req.body.day;
  var start_time = req.body.start_time;
  var school = req.body.school;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('UPDATE "sessions" SET "session_count"=$1, "grade"=$2, "facilitator"=$3, "day"=$4, "start_time"=$5, "school"=$6 WHERE "id" = $7;',
      [session_count, grade, facilitator, day, start_time, school, id],
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
});//end router.put

router.delete('/delete/:id', function(req, res) {
  console.log('in session delete route ', req.params)
  var sessionID = req.params.id;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        //tries to delete all events assosiated with the session;
        //if there is an exit-ticket already associated with an event, it throws an error
        db.query('DELETE FROM "events" WHERE "session_id" = $1;',
        [sessionID],
        function(queryError, result) {
          if (queryError) {
            done();
            res.sendStatus(500);
          } else {
            //resets the session ID of all users currently associated with that session
            db.query('UPDATE "users" SET "session_count"=null WHERE "session_count" = $1;',
            [sessionID],
            function(queryError, result) {
              if (queryError) {
                done();
                res.sendStatus(500);
              } else {
                //deletes the session
                db.query('DELETE FROM "sessions" WHERE "id" = $1;',
                [sessionID],
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
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});//end router.delete


module.exports = router;
