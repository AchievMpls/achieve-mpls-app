/**
* Admin Users Controller
* @desc controls the Admin Users View
* @param AdminService
* @return AllUser objects
*/
myApp.controller('AdminUsersController', ['$scope', '$http', '$location',
'$mdDialog', 'AdminService', function($scope, $http, $location, $mdDialog, AdminService){
console.log('Admin Users sourced: ');
  var users = this;
  AdminService.getAllUsers();
  users.allUsers = AdminService.allUsers;
  console.log('users', users.allUsers);

}]);
