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


router.delete('/deleteUser/:id', function(req, res) {
  var userID = req.params.id;
  console.log('on the server, your id is: ', userID);
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('error connecting: ', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      db.query('DELETE FROM "users" WHERE "id" = $1;',
      [userID],
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
});//end router.delete


router.post('/postUser', function(req, res) {
  console.log('req body', req.body);
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('INSERT INTO "users" ("fname", "lname", "email", "role", "password", "session_id", "grade") VALUES ($1,$2,$3,$4,$5,$6,$7);',
      [req.body.fname, req.body.lname, req.body.email, req.body.role, req.body.password, req.body.session_id, req.body.grade],
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
  var body = req.body;
  pool.connect(function(errorConnectingToDb, db, done) {
  if (errorConnectingToDb) {
    res.sendStatus(500);
  } else {
    db.query('UPDATE "users" SET "fname"=$1, "lname"=$2, "email"=$3, "role"=$4, "password"=$5, "session_id"=$6, "grade"=$7 WHERE "id" = $8;',
    [body.fname, body.lname, body.email, body.role, body.password, body.session_id, body.grade, id],
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
