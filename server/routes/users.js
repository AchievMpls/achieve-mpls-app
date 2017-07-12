var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

/**
* @desc router get request the list of coach only
* @param
* @return the results
*/

router.get('/', function(req, res) {
if (req.isAuthenticated()) {
      pool.connect(function(errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
          res.sendStatus(500);
        } else {

          db.query('SELECT * from "users" ORDER BY "fname" ASC ;',
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

router.get('/clearance', function(req, res) {
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    //prepare an object = { }
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

router.put('/deactivateUser', function(req, res) {
  var id = req.body.id;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('UPDATE "users" SET "session_count"=$1 WHERE "id" = $2;',
        [null, id],
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

router.post('/postUser', function(req, res) {
  console.log('postUser', req.body);
  var session_count = parseInt(req.body.session_count);
  var session_id = parseInt(req.body.session_id);
  var year = parseInt(req.body.year);
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      console.log('request is ', req.body.fname, req.body.lname, req.body.email, req.body.role, req.body.password, session_count, year, session_id);
      db.query('INSERT INTO "users" ("fname", "lname", "email", "role", "password", "session_count", "year", "session_id") VALUES ($1,$2,$3,$4,$5,$6,$7,$8);',
      [req.body.fname, req.body.lname, req.body.email, req.body.role, req.body.password, session_count, year, session_id],
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
});//end router.post

router.put('/updateUser', function(req, res) {
  var id = req.body.id;
  var session_count = parseInt(req.body.session_count);
  var year = parseInt(req.body.year);
  if (isNaN(session_count)) {
    session_count = null;
  }
  var body = req.body;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('UPDATE "users" SET "fname"=$1, "lname"=$2, "email"=$3, "role"=$4, "session_count"=$5, "year"=$6 WHERE "id" = $7;',
        [body.fname, body.lname, body.email, body.role, session_count, year, id],
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

module.exports = router;
