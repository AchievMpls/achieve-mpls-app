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
  console.log('here req params: ', req.params.year);
  console.log('sessionyears called on server; here the id: ', year);
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('error connecting: ', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      db.query('SELECT * from "sessions" WHERE "year" = $1 ORDER BY "session_count" ASC;',
      [year],
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
