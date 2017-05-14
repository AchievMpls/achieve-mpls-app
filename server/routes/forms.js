var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

/**
* @desc router get request all forms
* @param
* @return the results
*/
router.get('/', function(req, res) {
  console.log('calling getAllForms on server');
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('error connecting: ', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      db.query('SELECT * from "forms" ORDER BY "id" DESC;',
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
