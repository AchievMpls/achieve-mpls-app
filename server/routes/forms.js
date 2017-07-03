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
        db.query('SELECT * from "forms" JOIN "questions" on "forms"."form_name" = "questions"."form_name" ORDER BY "questions"."id" ASC;',
          function(queryError, result) {
            console.log('result of join is ', result.rows);
            done();
            var dataToSend = [];
            if (queryError) {
              res.sendStatus(500);
            } else {
              var resultArray = result.rows;
              var objectNameArray = [];
              resultArray.forEach(function(form) {
                if (objectNameArray.includes(form.form_name)) {
                  console.log('nothing to see here');
                } else {
                  objectNameArray.push(form.form_name);
                }
              });
              objectNameArray.forEach(function(form) {
                var newForm = {
                  form_name: form,
                  questions: []
                };
                resultArray.forEach(function(formQuestions) {
                  if (newForm.form_name === formQuestions.form_name) {
                    (newForm.questions).push(formQuestions.question);
                  }
                });
                dataToSend.push(newForm);
              });
              console.log('form sending is ', dataToSend);
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
  if (req.isAuthenticated()) {
    pool.connect(function(errorConnectingToDb, db, done) {
      if (errorConnectingToDb) {
        res.sendStatus(500);
      } else {
        db.query('INSERT INTO "forms" ("form_name") VALUES ($1);', [form_name]);
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
