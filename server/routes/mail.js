var express = require( 'express' );
var router = express.Router();
var nodeMailer = require( 'nodemailer' );
var pg = require( 'pg' );
var Chance = require( 'chance' );
var chance = new Chance();
var pool = require( '../modules/db' );

var transporter = nodeMailer.createTransport({
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
        code : chance.string({length : 10, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'}),
        id : req.body.id,
        email : req.body.email,
        timestamp: req.body.timestamp
      };
      console.log('user: ', user);
      pool.connect(function(errConnectingToDb, db, done) {
         if (errConnectingToDb) {
           console.log('Error Connecting: ', err);
           next(err);
         }
        //  db.query('UPDATE "users" SET "chance_token" = ($1) WHERE "id" = ($2) AND "email" = ($3);',
        //  [user.code, user.id, user.email],
         db.query('UPDATE "users" SET "chance_token" = ($1), "chance_expiration" = ($2) WHERE "id" = ($3) AND "email" = ($4);',
         [user.code, user.timestamp, user.id, user.email],
         function(queryError, result) {
           done();
           if (queryError) {
             console.log('Error making query. : ', queryError);
             res.sendStatus(500);
           } else {
           }
         });
       });
       var mailOptions = {
          from: '"Achieve Mpls" gradcoaches@gmail.com',
          to: mailer.email,
          subject: 'TEST',
          text: mailer.fname + ' ' + mailer.lname + ' Custom message. Activate here ' +
          'http://localhost:5000/#/createPassword/' + user.code
      //     html: '<b>' + mailer.message + '</b>' // html body
      };
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: ', info.messageId, info.response);
      });
      res.send(200);
});

// router.put('/activate/:code', function(req, res) {
//   var code = req.params.code;
//   // req.body.password // <- user will be sending password & e-mail
//
// });

module.exports = router;
