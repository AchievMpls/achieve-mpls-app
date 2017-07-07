var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

router.get('/', function(req, res) {
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(501);
      } else {
        db.query('SELECT "forms".*, row_to_json("questions".*) as "questions" FROM "forms" INNER JOIN "questions" ON ("forms"."form_name"="questions"."form_name") ORDER BY "questions"."id" ASC;',
          function(queryError, result) {
            done();
            var dataToSend = [];
            if (queryError) {
              res.sendStatus(500);
            } else {
              var resultArray = result.rows;
              var objectNameArray = [];
              resultArray.forEach(function(form) {
                if (objectNameArray.includes(form.form_name)) {} else {
                  objectNameArray.push(form.form_name);
                }
              });

              objectNameArray.forEach(function(form) {
                var newForm = {
                  form_id: '',
                  form_name: form,
                  questions: []
                };
                resultArray.forEach(function(formQuestions) {
                  if (newForm.form_name === formQuestions.questions.form_name) {
                    newForm.form_id = formQuestions.id;
                    var _question = {
                      question_id: formQuestions.questions.id,
                      question: formQuestions.questions.question
                    };
                    (newForm.questions).push(_question);
                  }
                });
                dataToSend.push(newForm);
              });
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
  console.log('result of post ', req.body);
  var form_name = req.body.form_name;
  var questions = req.body.promptsArray;
  var form_id = '';
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('INSERT INTO "forms" ("form_name") VALUES ($1);', [form_name]);
        db.query('SELECT "id" FROM "forms" WHERE "form_name" = $1;', [form_name],
          function(queryError, result) {
            console.log('result from select is ', result);
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
                      res.sendStatus(201);
                    }
                  });
              });
            }
          });
      }
    });
  } else {
    res.sendStatus(401);
  }
});


router.put('/update', function(req, res) {
  console.log('request body ', req.body);
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
          if (_question.question_id) {
            db.query('UPDATE "questions" SET "question"=$1, "form_name"=$2 WHERE "id" = $3;', [_question.question, form_name, _question.question_id]);
          } else {
            db.query('INSERT INTO "questions" ("form_name", "question", "form_id") VALUES ($1,$2,$3);', [form_name, _question.question, form_id],
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
