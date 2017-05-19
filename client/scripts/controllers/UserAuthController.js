/**
* User Auth Controller
* @desc controls the views related to loging in
* @param AdminService, AuthService
* @return User is logged in
*/

myApp.controller('UserAuthController', ['AdminService', 'AuthService', '$routeParams', '$http', '$location',
function(AdminService, AuthService, $routeParams, $http, $location){
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
  TODO       
  login.register = function(user) {
       console.log('login gets here', user);
         if(login.username === '' || login.password === '') {
             login.message = "Enter your username and password!";
           } else {
             AuthService.validUser(user);
           }
         };
}]);
