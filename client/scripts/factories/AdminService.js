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
      $http.get('/forms').then(function(response) {
        allForms.returnedForms = response.data;
      });
    }

    /**
    * @desc adds new form to db
    * @param
    * @return AllForms object
    */
    //YOU WERE HERE
    function addNewForm(formToSend) {
      console.log('in the service, formToSend is: ', formToSend);
      $http.post('/form/add', formToSend).then(function(response) {
        console.log('here the response: ', response);
        // getAllForms();
    });

    }

    return {
      getAllUsers: getAllUsers,
      allUsers: allUsers,
      getAllForms: getAllForms,
      allForms: allForms,
      addNewForm: addNewForm
    };

  }
]);
