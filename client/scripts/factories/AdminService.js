/**
* Admin Service Factory
* @desc Manages all of the functions related to the Admin
* @param $http, $location
* @return the list of coaches
*/

myApp.factory('AdminService', ['$http', '$location',
function($http, $location){
var allUsers = {
  users: []
};
/**

* @desc Admin gets the list of users
* @param
* @return AllUsers object
*/
  function getAllUsers() {
   $http.get('/users').then(function(response) {
     allUsers.users = response.data;
   });
 }


  return{
    getAllUsers: getAllUsers,
    allUsers: allUsers
  };
}]);
