var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/:session', function(req, res) {
  var session = req.params.session;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('SELECT * from "forms" JOIN "events" ON "events"."form_id" = "forms"."id" WHERE "session_id" = $1 ORDER BY "events"."meeting_count" ASC;',
      [session],
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

router.delete('/delete/:id', function(req, res) {
  var eventID = req.params.id;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('DELETE FROM "events" WHERE "id" = $1;',
      [eventID],
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
});//end router.delete


module.exports = router;
