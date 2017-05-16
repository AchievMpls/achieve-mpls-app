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

    //----------CRUD USERs ------------
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
     * @desc adds new users to db
     * @param userToSend object to user data
     */
    function addNewUser(userToSend) {
      $http.post('/users/postUser', userToSend).then(function(response) {
        getAllUsers();
      });
    }

    /**
     * @desc removes the user
     * @param id object sent AdminFormsController
     */
    function deleteUser(id) {
      console.log('user in factory ', id);
      $http.delete('/users/delete/' + id).then(function() {
        getAllUsers();
      });
    }

    /**
     * @desc updates user
     * @param userToSend object has be changed
     */
    function updateUser(userToSend) {
      $http.put('/users/update', userToSend).then(function(response) {
        getAllUsers();
      });
    }

    //--------CRUD FORMs-----------

    /**
     * @desc gets all forms from db
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
     * @param {object} formToSend the exit-ticket form to be created
     */
    function addNewForm(formToSend) {
      $http.post('/forms/add', formToSend).then(function(response) {
        getAllForms();
        formToSend.form_name = '';
        formToSend.prompts = [];
      });
    }

    /**
     * @desc updates form
     * @param {object} formToSend the exit-ticket form to be altered
     */
    function updateForm(formToSend) {
      $http.put('/forms/update', formToSend).then(function(response) {
        getAllForms();
        formToSend.form_name = '';
        formToSend.prompts = [];
      });
    }

    /**
     * @desc removes an exit-ticket form, per its ID.
     * @param {number} id - The form to be removed (specified in AdminFormsController.)
     */
    function deleteForm(id) {
      $http.delete('/forms/delete/' + id).then(function() {
        getAllForms();
      });
    }


    return {
      getAllUsers: getAllUsers,
      allUsers: allUsers,
      addNewUser: addNewUser,
      updateUser: updateUser,
      deleteUser: deleteUser,
      getAllForms: getAllForms,
      allForms: allForms,
      addNewForm: addNewForm,
      updateForm: updateForm,
      deleteForm: deleteForm
    };

  }
]);
