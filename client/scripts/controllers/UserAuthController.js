/**
* User Auth Controller
* @desc controls the views related to loging in
* @param AdminService, AuthService
* @return User is logged in
*/

myApp.controller('UserAuthController', ['AdminService', 'AuthService', '$mdDialog', '$routeParams', '$http', '$location', '$filter',
function(AdminService, AuthService, $mdDialog, $routeParams, $http, $location, $filter){


  // Route params with code
  // This happens after view/controller loads -- not ideal but it works for now.
  var user = this;
  /**
  * @desc function to login any user
  * @param Object with username which is their email, and password
  * @return
  */
 user.loginUser = function(user) {
      console.log('login gets here', user);
        if( user.username === '' || user.password === '') {
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Incomplete Form')
            .textContent("Please enter a username and password")
            .ariaLabel('Alert Dialog')
            .ok('OK')
          );
          } else {
            AuthService.loginUser(user);
          }
        };

  user.logout = function (){
    $http.get('/user/logout').then(function(response){
      console.log('logout pressed');
    });
    $location.path('/login');
  };

  /**
  * registerAdmin function
  * @desc allows administrator to establish initial account - should only be used once
  * @param Object with properties admin.fname, admin.lname, admin.email, admin.password
  * @return
  */
user.registerAdmin = function(admin) {
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

  /**
  * addUserPwd
  * @desc user to create the password, if the two inputs are not the same, popup alert is shown
  * @param the user enters in password
  * @return pass the active code and password pass to authService
  */
  user.addUserPwd = function(user) {
    var timestamp = new Date();

    console.log('add now', user.timestamp);
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
    }
    else
    {
      if (create !== confirm) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Create Password')
          .textContent('Please make sure the two passwords are the same.')
          .ariaLabel('Alert Dialog')
          .ok('OK!')
        );
      }
      else {
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
}]);
