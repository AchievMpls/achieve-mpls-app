var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/:session', function(req, res) {
  console.log('on server, session to query is: ', req.params.session);
  var session = req.params.session;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('error connecting: ', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      db.query('SELECT * from "events" JOIN "forms" ON "forms".id = "events"."form_id" WHERE "session_id" = $1 ORDER BY "events".id ASC;',
      [session],
      function(queryError, result) {
        console.log('error querying: ', queryError);
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



module.exports = router;
