/**
* User Auth Controller
* @desc controls the views related to loging in
* @param AdminService, AuthService
* @return User is logged in
*/

myApp.controller('UserAuthController', ['AdminService', 'AuthService', '$mdDialog', '$routeParams', '$http', '$location',
function(AdminService, AuthService, $mdDialog, $routeParams, $http, $location){
  // Route params with code
  // This happens after view/controller loads -- not ideal but it works for now.
  var login = this;

 login.validUser = function(user) {
      console.log('login gets here', user);
        if(login.username === '' || login.password === '') {
            login.message = "Enter your username and password!";
          } else {
            AuthService.validUser(user);
          }
        };
  /**
  * User Auth Controller
  * @desc user to create the password
  * @param the user enters in password
  * @return pass the active code and password pass to authService
  */
    login.addUserPwd = function(user) {
      user = {
        chance_token: $routeParams.code,
        password: user.passwordConfirm
      };
      console.log('hashpwd ', user);
      AuthService.addUserPwd(user);
    };

}]);
