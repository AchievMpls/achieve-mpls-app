/**
* User Auth Controller
* @desc controls the views related to loging in
* @param AdminService, AuthService
* @return User is logged in
*/
myApp.controller('UserAuthController', ['AdminService', 'AuthService', '$routeParams',
function(AdminService, Authservice, $routeParams){
  userAuth = this;
  // Route params with code grab from route param and pass to put statement which checks with if
  // statement whether param code is same as db code. ß
  if($routeParams.code != undefined) {
  userAuth.code.tempCode = $routeParams.code;
} else {
  // Code was saved in the UserService before
  // bouncing user to log in screen
}
}]);
