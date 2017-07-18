var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/', function(req, res) {
  var formActive = 'TRUE';
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(501);
      } else {
        db.query('SELECT "forms"."id","forms"."form_name", "forms"."form_active", array_to_json(array_agg(row_to_json((SELECT d FROM (SELECT "questions"."id", "questions"."question")d)))) AS "questions" FROM "questions" JOIN "forms" ON "forms"."id" = "questions"."form_id" WHERE "forms"."form_active"=$1 GROUP BY "forms"."id","forms"."form_name", "forms"."form_active" ORDER BY "id";',[formActive],
          function(queryError, result) {
            done();
            if (queryError) {
              res.sendStatus(500);
            } else {
              var dataToSend = result.rows;
              res.send(dataToSend);
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
  var formActive = 'TRUE';
  var form_id = '';
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('INSERT INTO "forms" ("form_name", "form_active") VALUES ($1,$2);', [form_name,formActive]);
        db.query('SELECT "id" FROM "forms" WHERE "form_name" = $1 AND "form_active" = $2;', [form_name,formActive],
          function(queryError, result) {
            if (queryError) {
              res.sendStatus(500);
            } else {
              form_id = result.rows[0].id;
              questions.forEach(function(_question) {
                db.query('INSERT INTO "questions" ("form_id", "form_name", "question") VALUES ($1,$2,$3);', [form_id, form_name, _question.question],
                  function(queryError, result) {
                    done();
                    if (queryError) {
                      res.sendStatus(500);
                    } else {
                      return;
                    }
                  });
              });
              res.sendStatus(200);
            }
          });
      }
    });
  } else {
    res.sendStatus(401);
  }
});


router.put('/update', function(req, res) {
  var id = req.body.form_id;
  var form_name = req.body.form_name;
  var form_id = req.body.form_id;
  var questions = req.body.prompts;
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('UPDATE "forms" SET "form_name"=$1 WHERE "id" = $2;', [form_name, id]);
        questions.forEach(function(_question) {
          if (_question.id) {
            db.query('UPDATE "questions" SET "question"=$1, "form_name"=$2 WHERE "id" = $3;', [_question.question, form_name, _question.id]);
          } else {
            db.query('INSERT INTO "questions" ("form_name", "question", "form_id") VALUES ($1,$2,$3);', [form_name, _question.question, form_id],
              function(queryError, result) {
                done();
                if (queryError) {
                  res.sendStatus(500);
                } else {
                  return;
                }
              });
          }
        });
        res.sendStatus(201);
      }
    });
  } else {
    res.sendStatus(401);
  }
}); //end router.put

router.delete('/delete/:id', function(req, res) {
  var formID = req.params.id;
  var formActive = 'FALSE';
  console.log('form to delete is ', formID);
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('UPDATE "forms" SET "form_active" = $2 WHERE "id" = $1;', [formID,formActive],
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
