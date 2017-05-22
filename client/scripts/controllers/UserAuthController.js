/**
* User Auth Controller
* @desc controls the views related to loging in
* @param AdminService, AuthService
* @return User is logged in
*/

myApp.controller('UserAuthController', ['AdminService', 'AuthService', '$mdDialog', '$routeParams', '$http', '$location', '$filter',
function(AdminService, AuthService, $mdDialog, $routeParams, $http, $location, $filter){

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
  /**
  * addUserPwd
  * @desc user to create the password, if the two inputs are not the same, popup alert is shown
  * @param the user enters in password
  * @return pass the active code and password pass to authService
  */

  user.addUserPwd = function(user) {

    var activateDate = new Date();
    user.activateDate = $filter('date')(activateDate, "yyyy-MM-dd");
    console.log('activeDate', user);

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
        user = {
          chance_token: $routeParams.code,
          password: user.passwordConfirm
        };
        console.log('hashpwd ', user);
        AuthService.addUserPwd(user);
      }
    }

  };
}]);
