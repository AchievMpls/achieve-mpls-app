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

// router.post('/add', function(req, res) {
//   var itemTheme = req.body.itemTheme;
//   var itemURL = req.body.itemURL;
//   var itemEN = req.body.itemEN;
//   var itemKN = req.body.itemKN;
//   var itemPron = req.body.itemPron;
//   pool.connect(function(errorConnectingToDb, db, done) {
//     if (errorConnectingToDb) {
//       res.sendStatus(500);
//     } else {
//       db.query('INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ($1,$2,$3,$4,$5);',
//       [itemTheme, itemURL, itemEN, itemKN, itemPron],
//       function(queryError, result) {
//         done();
//         if (queryError) {
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(201);
//         }
//       });
//     }
//   });
// });//end router.post




module.exports = router;
