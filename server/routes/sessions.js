var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/years', function(req, res) {
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
});//end router.get

router.get('/:year', function(req, res) {
  var year = req.params.year;
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
});//end router.get


router.post('/add', function(req, res) {
  console.log('on server, we got: ', req.body);
  var year = req.body.year;
  var session_count = req.body.session_count;
  var grade = req.body.grade;
  var facilitator = req.body.facilitator;
  var day = req.body.day;
  var start_time = req.body.start_time;
  var school = req.body.school;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('INSERT INTO "sessions" ("year", "session_count", "grade", "facilitator", "day", "start_time", "school") VALUES ($1,$2,$3,$4,$5,$6,$7);',
      [year, session_count, grade, facilitator, day, start_time, school],
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



router.delete('/delete/:id', function(req, res) {
  var sessionID = req.params.id;
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
          db.query('UPDATE "users" SET "session_id"=null WHERE "session_id" = $1;',
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
});//end router.delete


module.exports = router;
