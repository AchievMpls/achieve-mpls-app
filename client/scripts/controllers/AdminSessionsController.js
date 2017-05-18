/**
 * Admin Sessions Controller
 * @desc controls the Admin Sessions View
 * @param AdminService
 * @return
 */

myApp.controller('AdminSessionsController', ['AdminService', '$mdDialog', '$filter',
  function(AdminService, $mdDialog, $filter) {
    var sessions = this;
    var chosenYear = '';
    console.log('AdminSessionsController sourced');

    sessions.sessionYear = AdminService.sessionYear;
    AdminService.getSessionYears();

    sessions.getYearsSessions = AdminService.getYearsSessions;
    sessions.specificYear = AdminService.specificYear;

    sessions.routeToEvents = AdminService.routeToEvents;

    var daysList = ["Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays", "Sundays"];

    sessions.currentSession = {
      session_count : '',
      grade : '',
      facilitator : '',
      days : daysList,
      day : '',
      start_time : '',
      school : '',
      id : ''
    };

    var sessionToSend = {};
    sessions.editingSession = false;

    var today = new Date();
    sessions.nextYear = today.getFullYear()+1;

    /**
     * @global object that limits table's display length
     */
     sessions.query = {
      order: 'name',
      limit: 25,
      page: 1
    };

    var days = ("Mondays Tuesdays Wednesdays Thursdays Fridays Saturdays Sundays").split(' ').map(function(day) {
        return {name: day};
      });

      /**
      * @desc displays a session for editing
      * @param {object} session the event to be edited
      */
      sessions.editSession = function(session) {
        console.log(session);
        sessions.editingSession = true;
        sessions.clearFields();
        sessions.currentSession = {
          session_count : session.session_count,
          grade : session.grade,
          facilitator : session.facilitator,
          days : daysList,
          day : session.day,
          start_time : session.start_time,
          school : session.school,
          id : session.id,
          year : session.year
        };
        sessions.toggleForm();
      };


    sessions.sendSession = function(session) {
      console.log('the session that we are trying to send is ', session);
      sessionToSend.session_count = parseInt(sessions.session_count, 10);
      if(isNaN(sessionToSend.session_count) && (sessions.editingSession === false)){
        AdminService.sessionConflictPopup();
        return;
      }
      sessionToSend = {
        eventsToAdd : '',
        grade : session.grade,
        facilitator : session.facilitator,
        day : session.day,
        start_time : $filter('date')(session.start_time, "hh:mm"),
        school : session.school,
        year : session.year
      };


      if (sessions.editingSession) {
        sessions.editingSession = false;
        AdminService.updateSession(sessionToSend);
      }else {
        AdminService.addNewSession(sessionToSend);
      }
      sessions.clearFields();
    };//end sendSession

    sessions.clearFields = function () {
      sessions.currentSession = {
        session_count : '',
        grade : '',
        facilitator : '',
        days : ['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'],
        start_time : '',
        school : '',
        id : ''
      };
      sessionToSend = {};
    };


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

    sessions.addYear = function() {
      sessionToSend = {
        year : sessions.nextYear,
        session_count : 1,
        eventsToAdd : 0,
        grade : 9,
        facilitator : "None",
        day : "None",
        start_time : "00:00:00",
        school : "None"
      };

      AdminService.addNewSession(sessionToSend);
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
     * @function Toggle form
     * @desc toggles the form from visible to hidden.
     * @param used on the ng-click of both the add form and edit form.
     * @return toggles the class ng-hide on form-container.
     */
    sessions.toggleForm = function() {
      var itemToOpen = document.getElementById('form-container');
      itemToOpen.classList.toggle("ng-hide");
    };

  }//end controller function
]);
