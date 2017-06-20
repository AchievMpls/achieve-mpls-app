var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/', function(req, res) {
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('SELECT * from "forms" ORDER BY "id" DESC;',
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
}); //end router.get

router.post('/add', function(req, res) {
  var form_name = req.body.form_name;
  var questions = req.body.promptsArray;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
    questions.forEach(function(question) {
      db.query('INSERT INTO "questions" ("form_name", "question") VALUES ($1,$2);', [form_name, question],
        function(queryError, result) {
          done();
          if (queryError) {
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
    });
    db.query('INSERT INTO "forms" ("form_name") VALUES ($1);', [form_name],
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
});


router.put('/update', function(req, res) {
  var id = req.body.id;
  var form_name = req.body.form_name;
  var prompts = [null, null, null, null, null];
  for (var i = 0; i < req.body.prompts.length; i++) {
    prompts[i] = req.body.prompts[i];
  }
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('UPDATE "forms" SET "form_name"=$1, "q1_prompt"=$2, "q2_prompt"=$3, "q3_prompt"=$4, "q4_prompt"=$5, "q5_prompt"=$6 WHERE "id" = $7;', [form_name, prompts[0], prompts[1], prompts[2], prompts[3], prompts[4], id],
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
}); //end router.put

router.delete('/delete/:id', function(req, res) {
  var formID = req.params.id;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('DELETE FROM "forms" WHERE "id" = $1;', [formID],
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
}); //end router.delete



module.exports = router;
