//Base Modules
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//Auth Routes
var passport = require('./strategies/user_sql.js');
var session = require('express-session');

//Route Modules
var index = require('./routes/index.js');
var user = require('./routes/user.js');
var users = require('./routes/users.js');
var forms = require('./routes/forms.js');
var sessions = require('./routes/sessions.js');
var events = require('./routes/events.js');
var mail = require('./routes/mail.js');
var register = require('./routes/register');

var tickets = require('./routes/tickets.js');

//app config
app.set('port', (process.env.PORT || 5000));

//Middleware config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// login Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/user', user);
app.use('/users', users);
app.use('/forms', forms);
app.use('/sessions', sessions);
app.use('/events', events);
app.use('/mail', mail);
app.use('/register', register);
app.use('/tickets', tickets);
app.use('/', index);


//listen
app.listen(app.get('port'), function(){
  console.log('Listening on port!!! ', app.get('port'));
});

module.exports = app;
