/**
 * User Auth Controller
 * @desc controls the views related to loging in
 * @param AdminService, AuthService
 * @return User is logged in
 */

myApp.controller('UserAuthController', ['AuthService', '$mdDialog', '$routeParams', '$http', '$location', '$filter',
  function(AuthService, $mdDialog, $routeParams, $http, $location, $filter) {


    // Route params with code
    // This happens after view/controller loads -- not ideal but it works for now.
    var user = this;
    /**
     * @desc function to login any user
     * @param Object with username which is their email, and password
     * @return
     */
    user.loginUser = function(user) {
      if (user.username === '' || user.password === '') {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Incomplete Form')
          .textContent("Please enter a username and password")
          .ariaLabel('Alert Dialog')
          .ok('OK')
        );
      } else {
        var lowercaseEmail = user.email.toLowerCase();
        var userToSend = {
          email: lowercaseEmail,
          password: user.password
        }
        console.log(userToSend);
        AuthService.loginUser(userToSend);
      }
    };

    /**
     * @function logout
     * @desc logs the user out
     * @param called with an ng-init in the client.js file
     * @return sends the user back to the login page.
     */
    user.logout = function() {
      $http.get('/user/logout').then(function(response) {
        $location.path('/login');
      });
    };


    /**
     * registerAdmin function
     * @desc allows administrator to establish initial account - should only be used once
     * @param Object with properties admin.fname, admin.lname, admin.email, admin.password
     * @return
     */
    user.registerAdmin = function(admin) {
      if (!admin.fname || !admin.lname || !admin.email || !admin.password) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Incomplete Form')
          .textContent("Please complete all fields")
          .ariaLabel('Alert Dialog')
          .ok('OK')
        );
      } else {
        AuthService.registerAdmin(admin);
      }
    };

    /**
     * addUserPwd
     * @desc user to create the password, if the two inputs are not the same, popup alert is shown
     * @param the user enters in password
     * @return pass the active code and password pass to authService
     */
    user.addUserPwd = function(user) {
      var timestamp = new Date();
      var create = user.passwordCreate;
      var confirm = user.passwordConfirm;
      //if either the new password and confirm are not filled
      if (!create || !confirm) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Create Password')
          .textContent('Please fillout both fields.')
          .ariaLabel('Alert Dialog')
          .ok('OK!')
        );
      } else {
        if (create !== confirm) {
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Create Password')
            .textContent('Please make sure the two passwords are the same.')
            .ariaLabel('Alert Dialog')
            .ok('OK!')
          );
        } else {
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Password Created')
            .textContent('Your New Password Has Been Created!')
            .ariaLabel('Alert Dialog')
            .ok('OK!')
          )
          user = {
            chance_token: $routeParams.code,
            timestamp: $filter('date')(timestamp, "yyyy-MM-dd"),
            password: confirm
          };
          console.log('hashpwd ', user);
          AuthService.addUserPwd(user);
        }
      }
    };
  }
]);
