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
      db.query('SELECT * from "users" WHERE role = \'coach\' ORDER BY "fname" ASC ;',
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
module.exports = router;
