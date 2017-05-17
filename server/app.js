//Base Modules
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//Route Modules
var index = require('./routes/index.js');
var users = require('./routes/users.js');
var forms = require('./routes/forms.js');
var sessions = require('./routes/sessions.js');
var events = require('./routes/events.js');
var mail = require('./routes/mail.js');

//app config
app.set('port', (process.env.PORT || 5000));

//Middleware config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//Routes
app.use('/users', users);
app.use('/forms', forms);
app.use('/sessions', sessions);
app.use('/events', events);
app.use('/mail', mail);
app.use('/*', index);


//listen
app.listen(app.get('port'), function(){
  console.log('Listening on port: ', app.get('port'));
});

module.exports = app;
