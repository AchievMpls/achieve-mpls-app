/**
 * Admin Sessions Controller
 * @desc controls the Admin Sessions View
 * @param AdminService
 * @return
 */

myApp.controller('AdminSessionsController', ['AdminService', '$mdDialog', '$filter', '$route',
  function(AdminService, $mdDialog, $filter, $route) {
    var sessions = this;
    var chosenYear = '';
    console.log('AdminSessionsController sourced');

    /**
     * @desc {object} that contains the current year and the unique years with deactivated and all users
     * @return populated by the populateYearDropdown function and used in the Admin User View
     */
    sessions.sessionYear = AdminService.sessionYear;

    /**
     * @desc selects all sessions for a single school year
     * @param {number} year the year whose sessions are to be returned
     */
    sessions.getYearsSessions = AdminService.getYearsSessions;

    /**
     * @desc {object} that has the sessions and the completed exit tickets
     */
    sessions.specificYear = AdminService.specificYear;

    /**
     * @desc takes the user to a new view displaying
     * student view landing page, or from an individual entry.
     * @param {number} session_id the session whose events are to be returned
     */
    sessions.routeToEvents = AdminService.routeToEvents;

    /**
     * @desc {array} that contains the days of the week, listed on the add session screen
     */
    var daysList = ["Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays", "Sundays"];

    /**
     * @desc {array} defines the number of hours and minues for the time dropdown
     */
    var time = {
      hours: 24,
      minutes: 59,
    };

    /**
     * @desc {object} that gets populated with {array} of numbers for hours and minutes
     */
    sessions.timeDropdown = {
      hours: [],
      minutes: []
    };

    /**
     * @desc {object} with the information for a new session
     */
    sessions.newSession = {
      session_count: '',
      grade: '',
      facilitator: '',
      days: daysList,
      day: '',
      start_time: '',
      hours: '',
      minutes: '',
      school: '',
      id: ''
    };

    sessions.currentSession = {};

    /**
     * @desc calls the populateTime function to populate the array for dropdown time.
     */
    populateTime(time);

    /**
     * @function populate time
     * @desc populates the timeDropdown object with hours and minutes
     * @param time object that has the number of hours and number of minutes for the time
     * @return pushes the time into the arrays in the time dropdown object.
     */
    function populateTime(time) {
      for (var i = 1; i <= time.hours; i++) {
        sessions.timeDropdown.hours.push(i);
      }
      for (var j = 0; j <= time.minutes; j++) {
        if (j < 10) {
          sessions.timeDropdown.minutes.push('0' + j);
        } else {
          sessions.timeDropdown.minutes.push(j);
        }
      }
    }

    /**
     * @desc {boolean} tells the app whether we are editing a session or not.
     */
    sessions.editingSession = false;

    var today = new Date();
    sessions.nextYear = today.getFullYear() + 1;

    /**
     * @global object that limits table's display length
     */
    sessions.query = {
      order: 'name',
      limit: 25,
      page: 1
    };


    /**
     * @desc displays a session for editing
     * @param {object} session the event to be edited
     */
    sessions.editSession = function(session) {
      console.log(session);
      sessions.editingSession = true;
      sessions.clearFields();
      sessions.currentSession = {
        session_count: session.session_count,
        grade: session.grade,
        facilitator: session.facilitator,
        days: daysList,
        day: session.day,
        start_time: session.start_time,
        hours: '',
        minutes: '',
        school: session.school,
        id: session.id,
        year: session.year
      };
      splitTime(session.start_time);
      sessions.toggleForm();
    };

    /**
     * @function prepareTime
     * @desc prepares the time information to send to the DB
     * @param time {object} that includes hours and minutes
     * @return sets the value of start_time to the prepared time
     */
    function prepareTime(time) {
      start_time = time.hours + ':' + time.minutes;
    }

    /**
     * @function splitTime
     * @desc prepares time to be used by the dropdowns in the app
     * @param time string
     * @return time {object}
     */
    function splitTime(time) {
      console.log(time);
      var splitTimeArray = time.split(':');
      console.log(splitTimeArray);
      sessions.currentSession.hours = (splitTimeArray[0]);
      sessions.currentSession.minutes = (splitTimeArray[1]);
    }

    /**
     * @function sendSession
     * @desc prepares the session to send to the database
     * @param session from the DOM
     * @return prepared session, sent to either updateSession (editingSession TRUE)
     * or to addNewSession (editingSession FALSE).  Toggle's the form and clears the
     * fields after submission.
     */
    sessions.sendSession = function(session) {
      console.log('the session that we are trying to send is ', session);
      session.session_count = parseInt(session.session_count, 10);
      if (isNaN(session.session_count) && (sessions.editingSession === false)) {
        AdminService.sessionConflictPopup();
        return;
      }
      var sessionToSend = {
        eventsToAdd: session.eventsToAdd,
        grade: session.grade,
        facilitator: session.facilitator,
        day: session.day,
        start_time: session.hours + ':' + session.minutes,
        school: session.school,
        year: session.year,
        session_count: session.session_count,
        id: session.id
      };
      console.log('session to send is ', sessionToSend);
      if (sessions.editingSession) {
        sessions.editingSession = false;
        AdminService.updateSession(sessionToSend);
      } else {
        AdminService.addNewSession(sessionToSend);
      }
      sessions.toggleForm();
      sessions.clearFields();
    }; //end sendSession

    /**
     * @desc copies a new session into the current session, this clears the fields
     */
    sessions.clearFields = function() {
      angular.copy(sessions.newSession, sessions.currentSession);
    };

    /**
     * @desc confirmation message before a session is deleted
     */
    sessions.confirmDelete = function(session) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this session?')
        .textContent('This will remove the session forever.')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        AdminService.deleteSession(session);
      });
    };

    /**
     * @desc adds a new year to the database
     */
    sessions.addYear = function() {
      sessionToSend = {
        year: sessions.nextYear,
        session_count: 1,
        eventsToAdd: 0,
        grade: 9,
        facilitator: "None",
        day: "None",
        start_time: "00:00:00",
        school: "None"
      };

      AdminService.addNewSession(sessionToSend);
    };

    /**
     * @desc reloads the current route
     */
    sessions.reloadRoute = function() {
      $route.reload();
    };

    /**
     * @function On Key Press
     * @desc when the focus is on the window and the escape key is pressed, the form
     * is closed.
     * @param event
     * @return the @class ng-hide and aria-hidden are added to the form-container.
     * the @function clearFields is called to clear the fields on the form.
     */
    window.onkeydown = function(event) {
      var itemToClose = document.getElementById('form-container');
      if (event.keyCode === 27) {
        itemToClose.classList.add("ng-hide");
        itemToClose.setAttribute("aria-hidden", true);
        sessions.clearFields();
      }
    };

    /**
     * @function On click
     * @desc closes popup when clicked outside
     * @param click
     * @return hides the popup form
     */
    document.getElementById('sessions-background-darken').onclick = function() {
      var itemToClose = document.getElementById('form-container');
      itemToClose.classList.add('ng-hide');
      itemToClose.setAttribute('aria-hidden', true);
      sessions.clearFields();
    };

    /**
     * @function Toggle form
     * @desc toggles the form from visible to hidden.
     * @param used on the ng-click of both the add form and edit form.
     * @return toggles the class ng-hide on form-container.
     */
    sessions.toggleForm = function() {
      var itemToOpen = document.getElementById('form-container');
      itemToOpen.classList.toggle("ng-hide");
    };

    sessions.falseSession = function() {
      sessions.editingSession = false;
    };

  } //end controller function
]);
