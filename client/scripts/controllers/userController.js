myApp.controller('UserController', ['$scope', '$http', '$location', '$mdDialog', 'AdminService', function($scope, $http, $location, $mdDialog, AdminService){
  console.log('controller is sourced through index.js');
  var user = this;

// user.hello = AdminService.hello;
// user.hello();

user.getAllUsers = AdminService.getAllUsers;
user.getAllUsers();

}]);
