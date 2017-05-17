var express = require('express');
var router = express.Router();
var nodeMailer = require( 'nodemailer' );

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gradcoaches@gmail.com',
        pass: '@chievempls'  // DO NOT HOST THIS INFO ON GITHUB!
    }
});

router.post('/', function(req, res, next) {
      var mailer = req.body;
      console.log('log mailer ', mailer.email);

      var mailOptions = {
          from: '"Achieve Mpls" gradcoaches@gmail.com',
          to: mailer.email,
          subject: 'TEST',
          text: mailer.fname + ' ' + mailer.lname + ' Custom message.'
      //     html: '<b>' + mailer.message + '</b>' // html body
      };
      //
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: ', info.messageId, info.response);
      });

      res.send(200);
});

module.exports = router;
