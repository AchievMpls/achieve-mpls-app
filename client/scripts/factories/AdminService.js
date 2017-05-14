/**
 * Admin Service Factory
 * @desc Manages all of the functions related to the Admin
 * @param $http, $location
 * @return the list of coaches
 */

myApp.factory('AdminService', ['$http', '$location',
  function($http, $location) {
    var allUsers = {
      users: []
    };
    var allForms = {};


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

    /**
    * @desc Admin gets the list of forms
    * @param
    * @return AllForms object
    */
    function getAllForms() {
      console.log('getAllForms called');
      $http.get('/forms').then(function(response) {
        allForms.returnedForms = response.data;
        console.log('response from db: ', response.data);
        console.log("currently allforms.returnedForms is: ", allForms.returnedForms);
      });
    }



    return {
      getAllUsers: getAllUsers,
      allUsers: allUsers,
      getAllForms: getAllForms,
      allForms: allForms
    };

  }
]);
