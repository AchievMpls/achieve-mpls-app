var express = require('express');
var router = express.Router();
var passport = require('passport');
// var Users = require('../models/user');
var path = require('path');

// module with bcrypt functions
var encryptLib = require('../modules/encryption');
var pg = require('pg');
var pool = require('../modules/db');


var acquireCount = 0;
pool.on('acquire', function (client) {
  acquireCount++;
  console.log('client acquired: ', acquireCount);
});

var connectCount = 0;
pool.on('connect', function () {
  connectCount++;
  console.log('client connected: ', connectCount);
});

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {
  console.log('new user:', req.body);
  var saveUser = {
    username: req.body.email,
    password: encryptLib.encryptPassword(req.body.password)
  };
  console.log('new user:', saveUser);

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    // TODO: ALL REQUIRED FIELDS
    client.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
      [saveUser.email, saveUser.password],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            console.log('LOGIN FAILED');
            res.redirect('/');
          }
        });
  });

});
router.post('/admin', function(req, res, next) {
  var saveAdmin = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: encryptLib.encryptPassword(req.body.password),
    role:'admin'
  };
  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query("INSERT INTO users (fname, lname, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [saveAdmin.fname, saveAdmin.lname, saveAdmin.email, saveAdmin.password, saveAdmin.role],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            console.log('Success');
            res.sendStatus(200);
          }
        });
  });

});

//  Handles POST to create the new pwd for user
  router.post('/addPwd', function(req, res, next) {
    console.log('new pwd:', req.body);
    var savePwd= {
      chance_token: req.body.chance_token,
      password: encryptLib.encryptPassword(req.body.password)
    };
    console.log('new user:', savePwd);

    pool.connect(function(err, client, done) {
      if(err) {
        console.log("Error connecting: ", err);
        next(err);
      }
      // TODO: ALL REQUIRED FIELDS
      client.query('UPDATE "users" SET "password" = $1 WHERE "chance_token" = $2;',
        [savePwd.password, savePwd.chance_token],
          function (err, result) {
            client.end();

            if(err) {
              console.log("Error inserting data: ", err);
              next(err);
            } else {
              console.log('LOGIN FAILED');
              res.redirect('/');
            }
          });
    });
  });

module.exports = router;
