var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');
var pg = require('pg');
var Chance = require('chance');
var chance = new Chance();
var pool = require('../modules/db');
var mailCredentials = require('../modules/mailCredentials')

var transporter = nodeMailer.createTransport({
  //@TODO dummy e-mail for development purposes, should be replaced with new email and variables going live
  service: mailCredentials.service,
  auth: mailCredentials.auth
});

router.post('/', function(req, res, next) {
  var mail = req.body;
  var user = {
    // generate a random string and store in database for user with e-mail & id
    code: chance.string({length: 15, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'}),
    id: req.body.id,
    email: req.body.email,
    chance_expiration: req.body.chance_expiration
  };
  if (req.isAuthenticated()) {
    resetUserPassword(user, mail);
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});


router.post('/forgotpw', function(req, res, next) {
  // console.log('request is ', req.body);
  var email = req.body.email;
  var chanceExpiration = req.body.chance_expiration;
  var user;
  pool.connect(function(errConnectingToDb, db, done) {
    if (errConnectingToDb) {
      next(err);
    }
    db.query('SELECT * from "users" WHERE "email" = $1;', [email], function(error, result) {
      done();
      if (error) {
        res.sendStatus(500);
      } else {
        // console.log('after first db call ', result.rows[0]);
        user = result.rows[0];
        if (email === user.email) {
          var newPW = {
            // generate a random string and store in database for user with e-mail & id
            code: chance.string({length: 15, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'}),
            email: email,
            chance_expiration: chanceExpiration
          };
          db.query('UPDATE "users" SET "chance_token" = ($1), "chance_expiration" = ($2) WHERE "email" = ($3);', [
            newPW.code, newPW.chance_expiration, newPW.email
          ], function(queryError, result) {
            done();
            if (queryError) {
              res.sendStatus(500);
            } else {
              var mailOptions = {
                from: '"Achieve Mpls" gradcoaches@gmail.com',
                to: email,
                subject: 'Achieve Mpls Password Reset',
                text: 'Hi ' + user.fname + '. You have recently requested a password reset for your account with Achieve Mpls. To reset your password, please click here: ' + 'http://localhost:5000/#/createPassword/' + newPW.code + ' Thank you, and have a great day!'
              };
              transporter.sendMail(mailOptions, function(error, info) {
                res.sendStatus(200);
              })
            }
          })
        }
      }
    });
  });
});

router.post('/registerAll', function(req, res) {
  var year = req.body.year;
  var chance = req.body.chanceExp
  if (req.isAuthenticated()) {
    console.log('in register all path, right before select and reset function');
    selectAndResetAllCoaches(year, chance)
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
})

/**
 * @function select all coaches
 * @desc selects all coaches from the db
 * @param object with the year
 * @return array of objects with the coach info, then resets the PW for all the coaches
 */
function selectAndResetAllCoaches(year, chanceExpiration) {
  pool.connect(function(error, db, done) {
    if (error) {
      return
    } else {
      var _role = 'coach';
      db.query('SELECT * from "users" WHERE "role" = $1 and "year" = $2;', [_role, year],
        function(error, result) {
          done();
          if (error) {
            result.sendStatus(500);
          } else {
            userArray = result.rows
            userArray.forEach(function(user) {
              var _user = {
                // generate a random string and store in database for user with e-mail & id
                code: chance.string({length: 15, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'}),
                id: user.id,
                email: user.email,
                chance_expiration: chanceExpiration
              };
              var mailInfo = {
                email: user.email,
                fname: user.fname
              }
              console.log('select all and reset, right before reset user function');
              resetUserPassword(_user, mailInfo)
            });
          }
        });
      }
  });
}

/**
 * @function resetUserPassword
 * @desc updates user in db with new pw information
 * @param userObject with user info, and mailer, with mailer info
 * @return calls newUserEmail on success, to notify the user they are registered to achieve
 */
function resetUserPassword(userObject, mailer) {
  pool.connect(function(errConnectingToDb, db, done) {
    if (errConnectingToDb) {
      next(err);
    }
    db.query('UPDATE "users" SET "chance_token" = ($1), "chance_expiration" = ($2) WHERE "id" = ($3) AND "email" = ($4);', [
      userObject.code, userObject.chance_expiration, userObject.id, userObject.email
    ], function(queryError, result) {
      done();
      if (queryError) {
        result.sendStatus(500);
      } else {
          console.log('in reset user path right before mail send');
          newUserEmail(mailer, userObject.code)
          return 'success'
        }
      });
    });
}

/**
 * @function newUserEmail
 * @desc sends email to a user notifying the user that they can set their password
 * @param mailerObject that contains the mail info, and code for the pw change
 * @return sends emial to the user
*/
function newUserEmail(mailerObject, code) {
  var mailOptions = {
    from: '"Achieve Mpls" gradcoaches@gmail.com',
    to: mailerObject.email,
    subject: 'Welcome to Achieve Mpls!',
    text: 'Thank you for volunteering for AchieveMpls, ' + mailerObject.fname + '! Tao activate your account, please click here: ' + 'http://localhost:5000/#/createPassword/' + code + ' Thank you and we look forward to working with you.'
  };
    transporter.sendMail(mailOptions, function(error, info) {
      console.log('mail sending!');
      if (error) {
        return 'error';
      } else {
        return 'success';
      }
    });
}

module.exports = router;
