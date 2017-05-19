/**
* User Auth Controller
* @desc controls the views related to loging in
* @param AdminService, AuthService
* @return User is logged in
*/
myApp.controller('UserAuthController', ['AdminService', 'AuthService', '$routeParams', '$http',
function(AdminService, Authservice, $routeParams, $http){
  userAuth = this;
// @TODO waiting for passport to get set up before adding this fuctionality
  // userAuth.code = angular.copy(UserService.code); // probably don't need this
  // userAuth.joinGroup = AuthService.joinGroup;

  // Route params with code grab from route param and pass to put statement which checks with if
  // statement whether param code is same as db code.
  // @TODO this needs to be fitted to this project, psuedo-code at moment
  if($routeParams.code !== undefined) {
  userAuth.code.tempCode = $routeParams.code;
} else {
  // Code was saved in the UserService before
  // bouncing user to log in screen
}
}]);
