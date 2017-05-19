var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/:year', function(req, res) {
  var year = parseInt(req.params.year);
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id" ="users"."id" WHERE "year" = $1;',
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

router.post('/filteredtickets/', function(req, res) {
  console.log('on server, you got: ', req.body);
  // pool.connect(function(errorConnectingToDb, db, done) {
  //   if (errorConnectingToDb) {
  //     res.sendStatus(500);
  //   } else {
  //     db.query('SELECT * from "users" JOIN "sessions" ON "sessions"."id" = "users"."session_id" JOIN "form_responses" ON "form_responses"."user_id" ="users"."id" WHERE "year" = $1;',
  //     [year],
  //     function(queryError, result) {
  //       done();
  //       if (queryError) {
  //         res.sendStatus(500);
  //       } else {
  //         res.send(result.rows);
  //       }
  //     });
  //   }
  // });
});//end router.get

module.exports = router;
