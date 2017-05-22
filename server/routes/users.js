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
});//end router.get

router.get('/clearance', function(req, res) {
  console.log('hit get /clearance route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    //prepare an object = { }
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.sendStatus(403);
  }
});

router.put('/deactivateUser', function(req, res) {
  console.log('on server, id is: ', req.body.id);
  var id = req.body.id;
  pool.connect(function(errorConnectingToDb, db, done) {
  if (errorConnectingToDb) {
    console.log('error connecting: ', errorConnectingToDb);
    res.sendStatus(500);
  } else {
    db.query('UPDATE "users" SET "session_id"=$1 WHERE "id" = $2;',
    [null, id],
      function(queryError, result) {
        done();
        if (queryError) {
          console.log('error querying: ', queryError);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  }
});
});//end router.put

router.post('/postUser', function(req, res) {
  console.log('req body', req.body);
  var session_id = parseInt(req.body.session_id);
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('INSERT INTO "users" ("fname", "lname", "email", "role", "password", "session_id") VALUES ($1,$2,$3,$4,$5,$6);',
      [req.body.fname, req.body.lname, req.body.email, req.body.role, req.body.password, session_id],
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
  console.log('updating, we have: ', req.body);
  var id = req.body.id;
  var session_id = parseInt(req.body.session_id);
  console.log('now session is: ', session_id);
  var body = req.body;
  pool.connect(function(errorConnectingToDb, db, done) {
  if (errorConnectingToDb) {
    res.sendStatus(500);
  } else {
    db.query('UPDATE "users" SET "fname"=$1, "lname"=$2, "email"=$3, "role"=$4, "session_id"=$5 WHERE "id" = $6;',
    [body.fname, body.lname, body.email, body.role, session_id, id],
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
});//end router.put

module.exports = router;
