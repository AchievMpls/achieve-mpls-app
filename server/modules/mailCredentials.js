//contains the credentials for nodeMailer.  Set this before deployment.
//info can be found in the nodemailer documentation
//This is a dummy account.  You definitely want to change this, because well, this repo is public.
var mailCredentials = {
  service: 'gmail',
  auth: { user: 'gradcoaches@gmail.com', pass: '@chievempls'}
}

module.exports = mailCredentials
