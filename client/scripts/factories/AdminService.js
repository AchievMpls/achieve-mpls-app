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
    var allForms = {
      returnedForms: []
    };
    var sessionYear = {};
    var specificYear = {
      sessions: []
    };
    var currentSessionForEvents;
    var specificSession = {};

    //----------CRUD USERs ------------

    /**
     * @desc generate the random pwd
     * @param the length of the pwd
     * @return Interger -> String
     */
    function dec2hex(dec) {
      return ('0' + dec.toString(16)).substr(-2);
    }

    function generateId(len) {
      var arr = new Uint8Array((len || 40) / 2);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, dec2hex).join('');
    }

    /**
     * @desc Admin gets the list of users
     * @param
     * @return AllUsers object
     */
    function getAllUsers(callback) {
      console.log('user_callback=', callback);
      $http.get('/users').then(function(response) {
        callback(response.data);
      });
    }

    /**
     * @desc getUsers to set the limit item per page
     * @param generate the page, static limit and callback
     * to trigger the getAllUsers in order to get all data
     * @return limit amount of users object per page
     */

    function getUsers(page, limit, callback) {
      $http.get('/users').then(function(response) {
        var users = response.data.slice((page-1)*limit,limit*page);
        console.log('page:', page, 'limit=', limit);
        callback(users);
      });
    }

    /**
     * @desc adds new users to db
     * @param userToSend object to user data
     */
    function addNewUser(userToSend, callback) {
      console.log("addNewUser function: ",userToSend);
      console.log("callback in addnewUser=", callback);
      userToSend.password = generateId(10);
      $http.post('/users/postUser', userToSend).then(function(response) {
        getAllUsers(callback);
      });
    }
    /**
     * @desc updates user
     * @param userToSend object has be changed
     */
    function updateUser(userToSend, callback) {
      userToSend.password = generateId(10);
      $http.put('/users/updateUser', userToSend).then(function(response) {
        getAllUsers(callback);
      });
    }

    /**
     * @desc sets user session to 'null'
     * @param id object sent AdminFormsController
     */
    function deactivateUser(user) {
      $http.put('/users/deactivateUser', user).then(function(response) {
        getAllUsers();
      });
    }

    //--------CRUD FORMs-----------

    /**
     * @desc gets all forms from db
     * @param
     * @return AllForms object
     */
    function getAllForms(callback) {
      $http.get('/forms').then(function(response) {
      //  allForms.returnedForms = response.data;
        callback(response.data);
      });
    }

    /**
     * @desc getUsers to set the limit item per page
     * @param generate the page, static limit and callback
     * to trigger the getAllUsers in order to get all data
     * @return limit amount of users object per page
     */

    function getForms(page, limit, callback) {
      $http.get('/forms').then(function(response) {
        var forms = response.data.slice((page-1)*limit,limit*page);
        callback(forms);
      });
    }

    /**
     * @desc adds new form to db
     * @param {object} formToSend the exit-ticket form to be created
     */
    function addNewForm(formToSend, callback) {
      $http.post('/forms/add', formToSend).then(function(response) {
        getAllForms(callback);
        formToSend.form_name = '';
        formToSend.prompts = [];
      });
    }

    /**
     * @desc updates form
     * @param {object} formToSend the exit-ticket form to be altered
     */
    function updateForm(formToSend, callback) {
      $http.put('/forms/update', formToSend).then(function(response) {
        getAllForms(callback);
        formToSend.form_name = '';
        formToSend.prompts = [];
      });
    }

    /**
     * @desc removes an exit-ticket form, per its ID.
     * @param {number} id - The form to be removed (specified in AdminFormsController.)
     */
    function deleteForm(id, callback) {
      $http.delete('/forms/delete/' + id).then(function() {
        getAllForms(callback);
      });
    }
  //--------CRUD Sessions-----------
    /**
     * @desc selects (one of) each year for which there is currently
     * at least one session in the db
     */
    function getSessionYears() {
      $http.get('/sessions/years').then(function(response) {
        sessionYear.uniques = response.data;
        sessionYear.currentYear = moment().format('YYYY');
      });
    }

    /**
     * @desc selects all sessions for a single school year
     * @param {number} year the year whose sessions are to be returned
     */
    function getYearsSessions(year, callback) {
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
          //specificYear.sessions = response.data;
          callback(response.data);
        });
      }
    }
        /**
         * @desc getYrsSessions to set the limit item per page
         * @param generate the page, static limit and callback
         * to trigger the getYearsSessions in order to get all data
         * @return limit amount of users object per page
         */
        function getYrsSessions(year, page, limit, callback) {
          $http.get('/sessions/' + year).then(function(response) {
            var sessions = response.data.slice((page-1)*limit,limit*page);
            callback(sessions);
          });
        }
    /**
     * @desc adds new session (and linked events) to db
     * @param {object} sessionToSend the exit-ticket form to be created
     */
    function addNewSession(sessionToSend, callback) {
      $http.post('/sessions/add', sessionToSend).then(function(response) {
        //getYearsSessions(sessionToSend.year);
        getYearsSessions(sessionToSend.year, callback);
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
    function updateSession(sessionToSend, callback) {
      $http.put('/sessions/update', sessionToSend).then(function(response) {
        //getYearsSessions(sessionToSend.year);
        etYearsSessions(sessionToSend.year, callback);
      });
    }

    /**
     * @desc removes a session, per its ID.
     * @param {object} session - The session to be removed & redisplayed
     */
    function deleteSession(session, callback) {
      $http.delete('/sessions/delete/' + session.id).then(function() {
        //getYearsSessions(session.year);
        getYearsSessions(session.year, callback);
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
//--------CRUD Events-----------
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


    /**
     * @desc selects all tickets for a single school year
     * @param {number} year the year whose tickets are to be returned
     */
    function getYearsTickets(year) {
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
        $http.get('/tickets/' + year).then(function(response) {
          specificYear.tickets = response.data;
        });
      }
    }

    /**
     * @desc selects all tickets matching the  for a single school year
     * @param {object} filters the year whose sessions are to be returned
     */
    function getFilteredTickets(filters) {
      $http.post('/tickets/filteredtickets/', filters).then(function(response) {
        specificYear.tickets = response.data;
      });
    }

    return {
      getUsers: getUsers,
      getAllUsers: getAllUsers,
      allUsers: allUsers,
      addNewUser: addNewUser,
      updateUser: updateUser,
      deactivateUser: deactivateUser,
      getForms : getForms,
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
      updateSession: updateSession,
      getYearsTickets: getYearsTickets,
      getFilteredTickets: getFilteredTickets,
    };

  }
]);
