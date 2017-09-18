/**
 * Forgot Password Controller
 * @desc controls the Forgot Password View
 * @param AdminService
 * @return
 */

 myApp.controller('ForgotPasswordController', ['AuthService', '$mdDialog',
   function(AuthService, $mdDialog, $mdPanel) {
     var pw = this;

     /**
      * @function forgotpw
      * @desc displays confirmation message and sends new pw to user email
      * @param user email
      * @return user pw reset, email sent to user with reset pw link
      */
     pw.forgotpw = function(email) {
          AuthService.forgotPW(email);
         $mdDialog.show(
           $mdDialog.alert()
           .clickOutsideToClose(true)
           .title('Reset Password')
           .textContent("Reset Password link has been sent to the e-mail provided")
           .ariaLabel('Alert Dialog')
           .ok('OK')
         );
       };
   }
 ]);
