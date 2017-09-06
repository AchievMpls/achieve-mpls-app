/**
 * Admin Service Factory
 * @desc Manages all of the functions related to the Admin
 * @param $http, $location
 * @return the list of coaches
 */
myApp.factory('AdminService', ['$http', '$location', '$mdDialog',
  function($http, $location, $mdDialog) {
    console.log('AdminService Sourced');
    //@TODO: this is disgusting, and it's all y's fault.
    // if we have time, let's refactor.
    var allUsers = {
      users: []
    };

    var userArray = [];

    /**
     * @desc {array} that contains all of the available forms
     */
    var allForms = [];

    /**
     * @desc {object} that contains the current year and the unique years with deactivated and all users
     * @return populated by the populateYearDropdown function and used in the Admin User View
     */
    var sessionYear = {
      currentYear: moment().format('YYYY')
    };

    /**
     * @desc {object} that has the sessions and the completed exit tickets
     */
    var specificYear = {};
    var currentSessionForEvents;
    var specificSession = {};

    //functions to load the initial data for the application
    getYearsSessions(moment().format('YYYY'));
    getSessionYears();
    getAllForms();
    getAllUsers();
    getYearsTickets(moment().format('YYYY'));

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
    function getAllUsers() {
      console.log('get all users called');
      $http.get('/users').then(function(response) {
        allUsers.users = response.data;
        console.log('get all users ', response.data);
        filterUserArray(response.data, sessionYear.currentYear);
      });
    }

    /**
     * @desc splits array of users between years
     * @param array of users and year
     * @return new {array} that includes
     */
    function filterUserArray(users, year) {
      console.log('year and users being passed through filter is ', year, ' ', users);
      if (userArray.length > 0) {
        userArray.length = 0;
      }
      users.forEach(function(user) {
        if (user.role === 'admin') {
          userArray.push(user);
        }
        if (user.year == year) {
          userArray.push(user);
        }
      });
      // }
    }

    /**
     * @desc adds new users to db
     * @param userToSend object to user data
     */
    function addNewUser(userToSend, callback) {
      console.log("addNewUser function: ", userToSend);
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

    /**
     * @desc deletes only admin users per its ID.
     * @param {number} id - The admin user to be deleted (specified in AdminUsersController)
     */
    function deleteAdmin(id) {
      // console.log("deleteAdmin in service", id);
      $http.delete('/users/delete/' + id).then(function(response) {
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
        allForms.length = 0;
        response.data.forEach(function(form) {
          allForms.push(form);
        });
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
      $http.delete('/forms/delete/' + id).then(function(response) {
        getAllForms(callback);
      });
    }

    /**
     * @function assignForm
     * @desc assigns the form to all of the events associated with a particular grade
     * @param {object} contains year, grade, start date, end date, form, event
     * @return form is assigned
     */
    function assignForm(form) {
      $http.post('/forms/assign/', form).then(function(response) {
        getAllForms();
      });
    }

    //--------CRUD Sessions-----------
    /**
     * @desc selects (one of) each year for which there is currently
     * at least one session in the db
     */
    function getSessionYears() {
      $http.get('/sessions/years').then(function(response) {
        console.log('get session years triggered with ', response.data);
        sessionYear.uniques = response.data;
        sessionYear.currentYear = moment().format('YYYY');
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
          console.log('getYearsSessions called');
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
      console.log('get tickets called');
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
          specificYear.tickets = [];
          (response.data).forEach(function(res) {
            var ticket = {
              date_form_completed: moment(res.date_form_completed).format('MMMM DD, YYYY'),
              session_count: res.session_count,
              event_number: res.meeting_count,
              facilitator: res.facilitator,
              grade: res.grade,
              school: res.school,
              day: res.day,
              start_time: res.start_time,
              fname: res.fname,
              lname: res.lname,
              response: res.response,
            };
            (specificYear.tickets).push(ticket);
          });
          console.log('specificYear is ', specificYear);
        });
      }
    }

    return {
      getAllUsers: getAllUsers,
      allUsers: allUsers,
      addNewUser: addNewUser,
      updateUser: updateUser,
      deactivateUser: deactivateUser,
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
      deleteAdmin: deleteAdmin,
      addNewEvent: addNewEvent,
      meetingConflictPopup: meetingConflictPopup,
      updateEvent: updateEvent,
      sessionConflictPopup: sessionConflictPopup,
      addNewSession: addNewSession,
      updateSession: updateSession,
      getYearsTickets: getYearsTickets,
      userArray: userArray,
      filterUserArray: filterUserArray
    };

  }
]);
