/**
* User Auth Controller
* @desc controls the views related to loging in
* @param AdminService, AuthService
* @return User is logged in
*/

myApp.controller('UserAuthController', ['AdminService', 'AuthService', '$routeParams', '$http', '$location', '$mdDialog',
function(AdminService, AuthService, $routeParams, $http, $location, $mdDialog){
  // Route params with code
  // This happens after view/controller loads -- not ideal but it works for now.
  var user = this;
  /**
  * @desc
  * @param
  * @return
  */
 user.validUser = function(user) {
      console.log('login gets here', user);
        if(!user.username || !user.password ) {
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Incomplete Form')
            .textContent("Please enter a username and password")
            .ariaLabel('Alert Dialog')
            .ok('OK')
          );
          } else {
            AuthService.validUser(user);
          }
        };

  /**
  * @desc allows administrator to establish initial account - should only be used once
  * @param Object with properties admin.fname, admin.lname, admin.email, admin.password
  * @return 
  */
user.registerAdmin = function(admin) {
     console.log('register gets here', admin);
       if(!admin.fname || !admin.lname || !admin.email || !admin.password ) {
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
}]);
