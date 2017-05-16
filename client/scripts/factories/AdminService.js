/**
 * Admin Service Factory
 * @desc Manages all of the functions related to the Admin
 * @param $http, $location
 * @return the list of coaches
 */
myApp.factory('AdminService', ['$http', '$location', '$mdDialog',
  function($http, $location, $mdDialog) {

    //@TODO: this is disgusting, and it's all y's fault.
    // if we have time, let's refactor.
    var allUsers = {
      users: []
    };
    var allForms = {};
    var sessionYear = {};
    var specificYear = {};
    var currentSessionForEvents;
    var specificSession = {};

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

    /**
     * @desc selects (one of) each year for which there is currently
     * at least one session in the db
     */
    function getSessionYears() {
      $http.get('/sessions/years').then(function(response) {
        sessionYear.uniques = response.data;
      });
    }

    /**
     * @desc selects all sessions for a single school year
     * @param {number} year the year whose sessions are to be returned
     */
    function getYearsSessions(year) {
      console.log('chosen year in AdminService is: ', year);
      if (!year) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Incomplete Form!')
          .textContent('Please include a year.')
          .ariaLabel('Alert Dialog')
          .ok('OK!')
        );
      } else {
        $http.get('/sessions/' + year).then(function(response) {
          specificYear.sessions = response.data;
          console.log('db gives you:  ', specificYear);
        });
      }
    }

    /**
     * @desc takes the user to a new view displaying
     * student view landing page, or from an individual entry.
     * @param {number} session_id the session whose events are to be returned
     */
    function routeToEvents(session_id) {
      if (session_id) {
        currentSessionForEvents = session_id;
      }
      console.log('here the session id: ', currentSessionForEvents);
      $location.path("/events");
    }

    /**
     * @desc grabs all events from a single session, based on which session
     * was most-recently clicked on to call the routeToEvents() function
     */
    function getSessionsEvents() {
      console.log('here current session for events: ', currentSessionForEvents);
      $http.get('/events/' + currentSessionForEvents).then(function(response) {
        specificSession.events = response.data;
        console.log('db gives you:  ', specificSession);
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
      deleteForm: deleteForm,
      getSessionYears: getSessionYears,
      sessionYear: sessionYear,
      getYearsSessions: getYearsSessions,
      specificYear: specificYear,
      routeToEvents: routeToEvents,
      getSessionsEvents: getSessionsEvents,
      specificSession: specificSession
    };

  }
]);
