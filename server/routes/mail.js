var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');
var pg = require('pg');
var Chance = require('chance');
var chance = new Chance();
var pool = require('../modules/db');

var transporter = nodeMailer.createTransport({
  //@TODO dummy e-mail for development purposes, should be replaced with new email and variables going live
  service: 'gmail',
  auth: {
    user: 'gradcoaches@gmail.com',
    pass: '@chievempls'
  }
});

router.post('/', function(req, res, next) {
  var mailer = req.body;
  var user = {
    // generate a random string and store in database for user with e-mail & id
    code: chance.string({length: 15, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'}),
    id: req.body.id,
    email: req.body.email,
    chance_expiration: req.body.chance_expiration
  };
  if (req.isAuthenticated()) {
    pool.connect(function(errConnectingToDb, db, done) {
      if (errConnectingToDb) {
        next(err);
      }
      db.query('UPDATE "users" SET "chance_token" = ($1), "chance_expiration" = ($2) WHERE "id" = ($3) AND "email" = ($4);', [
        user.code, user.chance_expiration, user.id, user.email
      ], function(queryError, result) {
        done();
        if (queryError) {
          res.sendStatus(500);
        } else {}
      });
    });
  } else {
    res.sendStatus(401);
  }
  var mailOptions = {
    from: '"Achieve Mpls" gradcoaches@gmail.com',
    to: mailer.email,
    subject: 'Welcome to Achieve Mpls!',
    text: 'Thank you for volunteering for AchieveMpls, ' + mailer.fname + '! To activate your account, please click here: ' + 'http://localhost:5000/#/createPassword/' + user.code + ' Thank you and we look forward to working with you.'
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.sendStatus(500);
    }
  });
  res.send(200);
});

router.post('/forgotpw', function(req, res, next) {
  var email = req.body.email
  var dbEmail;
  db.query('SELECT * from "users" WHERE "email" = $1;', [email],
  function(error, result) {
    done();
    if (error) {
      res.sendStatus(500);
    } else {
      dbEmail = result;
      if (email === dbEmail) {
        var newPW = {
          // generate a random string and store in database for user with e-mail & id
          code: chance.string({length: 15, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'}),
          email: email,
          chance_expiration: req.body.chance_expiration
        };
        db.query('UPDATE "users" SET "chance_token" = ($1), "chance_expiration" = ($2) WHERE "email" = ($3);', [
          newPW.code, newPW.chance_expiration, newPW.email
        ], function(queryError, result) {
          done();
          if(querryError) {
            result.sendStatus(500);
          } else {
            result.sendStatus(200);
          }
        })
      }
    }
  });
  var mailOptions = {
    from: '"Achieve Mpls" gradcoaches@gmail.com',
    to: mailer.email,
    subject: 'Achieve Mpls Password Reset',
    text: 'Thank you for volunteering for AchieveMpls, ' + mailer.fname + '! To activate your account, please click here: ' + 'http://localhost:5000/#/createPassword/' + user.code + ' Thank you and we look forward to working with you.'
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.sendStatus(500);
    }
  });
  res.send(200);
});

module.exports = router;
