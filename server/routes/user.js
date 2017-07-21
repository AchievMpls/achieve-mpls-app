var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    var userInfo = {
      username : req.user.email,
      role : req.user.role,
      session_count : req.user.session_count,
      user_id : req.user.id
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
