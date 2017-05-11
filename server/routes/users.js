var express = require('express');
var router = express.Router();
var pg = require('pg');
// var pool = require('../modules/db');

router.get('/get', function(req, res) {
  console.log("call coming through on server side");
  // pool.connect(function(errorConnectingToDb, db, done) {
  //   if (errorConnectingToDb) {
  //     res.sendStatus(500);
  //   } else {
  //     db.query('SELECT * from "items" ORDER BY "id" DESC;',
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
