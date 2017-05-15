/**
 * Admin Service Factory
 * @desc Manages all of the functions related to the Admin
 * @param $http, $location
 * @return the list of coaches
 */
myApp.factory('AdminService', ['$http', '$location',
  function($http, $location) {

    //@TODO: this is disgusting, and it's all y's fault.
    // if we have time, let's refactor.
    var allUsers = {
      users: []
    };
    var allForms = {};
    var sessionYear = {};
    var specificYear = {};


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

    function getSessionYears() {
      $http.get('/sessions/years').then(function(response) {
        sessionYear.uniques = response.data;
      });
    }

    function getYearsSessions(year) {
      console.log('chosen year in AdminService is: ', year);
      $http.get('/sessions/' + year).then(function(response) {
        specificYear.sessions = response.data;
        console.log('db gives you:  ', specificYear);
      });
    }

    return {
      getAllUsers: getAllUsers,
      allUsers: allUsers,
      getAllForms: getAllForms,
      allForms: allForms,
      addNewForm: addNewForm,
      updateForm: updateForm,
      deleteForm: deleteForm,
      getSessionYears: getSessionYears,
      sessionYear: sessionYear,
      getYearsSessions: getYearsSessions,
      specificYear: specificYear
    };

  }
]);
