var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/:session', function(req, res) {
  var session = req.params.session;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('SELECT * from "forms" JOIN "events" ON "events"."form_id" = "forms"."id" WHERE "session_id" = $1 ORDER BY "events"."meeting_count" ASC;', [session],
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
}); //end router.get

router.post('/add', function(req, res) {
  console.log('add request ', req.body);
  var session_id = req.body.session_id;
  var meeting_count = req.body.meeting_count;
  var form_id = req.body.form_id;
  var open_date = req.body.open_date;
  var close_date = req.body.close_date;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('INSERT INTO "events" ("session_id", "meeting_count", "form_id", "date_form_open", "date_form_close") VALUES ($1,$2,$3,$4,$5);',
        [session_id, meeting_count, form_id, open_date, close_date],
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

router.put('/update', function(req, res) {
  var id = req.body.id;
  var meeting_count = req.body.meeting_count;
  var form_id = req.body.form_id;
  var open_date = req.body.open_date;
  var close_date = req.body.close_date;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
      } else {
        db.query('UPDATE "events" SET "meeting_count"=$1, "form_id"=$2, "date_form_open"=$3, "date_form_close"=$4 WHERE "id" = $5;',
        [meeting_count, form_id, open_date, close_date, id],
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
  var eventID = req.params.id;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('DELETE FROM "events" WHERE "id" = $1;', [eventID],
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
}); //end router.delete


module.exports = router;
