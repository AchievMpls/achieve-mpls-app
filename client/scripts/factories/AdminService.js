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
    var userToSend = {
      fname: 'emily',
      lname: 'hoang',
      email: 'emily@yahoo.com',
      role: 'coach',
      password: 'emily'
    };
    /**
     * @desc adds new users to db
     * @param userToSend object to user data
     */
    function addNewUser(userToSend) {
      console.log('add user');
      $http.post('/users/postUser', userToSend).then(function(response) {
        getAllUsers();
      });
    }
    /**
     * @desc updates user
     * @param userToSend object has be changed
     */
    function updateUser(userToSend) {
      console.log('update user');
      // $http.put('/users/update', userToSend).then(function(response) {
      //   getAllUsers();
      //  });
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
        });
      }
    }

    /**
     * @desc adds new session (and linked events) to db
     * @param {object} sessionToSend the exit-ticket form to be created
     */
    function addNewSession(sessionToSend) {
      $http.post('/sessions/add', sessionToSend).then(function(response) {
        getYearsSessions(sessionToSend.year);
      }, function() {
        sessionConflictPopup();
      });
    }

    function sessionConflictPopup() {
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Cannot Save!')
        .textContent('Session Count must be a number unique to this Year.')
        .ariaLabel('Alert Dialog')
        .ok('OK!')
      );
    }

    /**
     * @desc update session
     * @param {object} sessionToSend the session to be altered
     */
    function updateSession(sessionToSend) {
      $http.put('/sessions/update', sessionToSend).then(function(response) {
        getYearsSessions(sessionToSend.year);
      });
    }

    /**
     * @desc removes a session, per its ID.
     * @param {object} session - The session to be removed & redisplayed
     */
    function deleteSession(session) {
      $http.delete('/sessions/delete/' + session.id).then(function() {
        getYearsSessions(session.year);
      }, function() {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Cannot Delete Session!')
          .textContent('At least one exit-ticket has already been submitted for one of this session\'s events.')
          .ariaLabel('Alert Dialog')
          .ok('OK!')
        );
      });
    }

    /**
     * @desc takes the user to a new view displaying
     * student view landing page, or from an individual entry.
     * @param {number} session_id the session whose events are to be returned
     */
    function routeToEvents(session) {
        currentSessionForEvents = session.id;
      $location.path("/events");
    }

    /**
     * @desc grabs all events from a single session, based on which session
     * was most-recently clicked on to call the routeToEvents() function
     */
    function getSessionsEvents() {
      $http.get('/events/' + currentSessionForEvents).then(function(response) {
        specificSession.events = response.data;
      });
    }

    /**
     * @desc adds new event to db
     * @param {object} eventToSend the exit-ticket form to be created
     */
    function addNewEvent(eventToSend) {
      eventToSend.session_id = currentSessionForEvents;
      console.log(eventToSend);
      $http.post('/events/add', eventToSend).then(function(response) {
        getSessionsEvents();
      }, function() {
        meetingConflictPopup();
      });
    }

    function meetingConflictPopup() {
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Cannot Save!')
        .textContent('Meeting Count must be a number unique to this Session.')
        .ariaLabel('Alert Dialog')
        .ok('OK!')
      );
    }

    /**
     * @desc update event
     * @param {object} eventToSend the event to be altered
     */
    function updateEvent(eventToSend) {
      $http.put('/events/update', eventToSend).then(function(response) {
        getSessionsEvents();
      });
    }

    /**
     * @desc removes an event, per its ID.
     * @param {number} eventID - The event to be removed &
     * session's events to be displayed
     */
    function deleteEvent(eventID) {
      $http.delete('/events/delete/' + eventID).then(function() {
        getSessionsEvents();
      }, function() {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Cannot Delete Event!')
          .textContent('At least one exit-ticket has already been submitted for this event.')
          .ariaLabel('Alert Dialog')
          .ok('OK!')
        );
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
      specificSession: specificSession,
      deleteSession: deleteSession,
      deleteEvent: deleteEvent,
      addNewEvent: addNewEvent,
      meetingConflictPopup: meetingConflictPopup,
      updateEvent: updateEvent,
      sessionConflictPopup: sessionConflictPopup,
      addNewSession: addNewSession,
      updateSession: updateSession
    };

  }
]);
