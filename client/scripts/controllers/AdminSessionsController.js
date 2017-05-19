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

  var time = {
    hours : 12,
    minutes : 59,
  };

  sessions.timeDropdown = {
    hours : [],
    minutes : []
  };

  sessions.newSession = {
    session_count : '',
    grade : '',
    facilitator : '',
    days : daysList,
    day : '',
    start_time : '',
    hours : '',
    minutes : '',
    school : '',
    id : ''
  };

  sessions.currentSession = {};

  /**
  * @desc calls the populateTime function to populate the array for dropdown time.
  */
  populateTime (time);

  /**
  * @function populate time
  * @desc populates the timeDropdown object with hours and minutes
  * @param time object that has the number of hours and number of minutes for the time
  * @return pushes the time into the arrays in the time dropdown object.
  */
  function populateTime (time) {
    for (var i = 1; i <= time.hours; i++){
      sessions.timeDropdown.hours.push(i);
    }
    for (var j = 0; j <= time.minutes; j++){
      if (j < 10){
      sessions.timeDropdown.minutes.push('0' + j);
      } else {
      sessions.timeDropdown.minutes.push(j);
      }
    }
  }



  console.log(sessions.currentSession.timeDropdown);

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

  function prepareTime (time) {
    start_time = time.hours + ':' + time.minutes;
  }

  sessions.sendSession = function(session) {
    console.log('the session that we are trying to send is ', session);
    session.session_count = parseInt(session.session_count, 10);
    if(isNaN(session.session_count) && (sessions.editingSession === false)){
      AdminService.sessionConflictPopup();
      return;
    }
    var sessionToSend = {
      eventsToAdd : 0,
      grade : session.grade,
      facilitator : session.facilitator,
      day : session.day,
      start_time : session.hours + ':' + session.minutes,
      school : session.school,
      year : sessions.sessionYear.currentYear,
      session_count : session.session_count,
      id : session.id
    };
    console.log(sessionToSend);
    if (sessions.editingSession) {
      sessions.editingSession = false;
      AdminService.updateSession(sessionToSend);
    }else {
      AdminService.addNewSession(sessionToSend);
    }
    sessions.toggleForm();
    sessions.clearFields();
  };//end sendSession

  sessions.clearFields = function () {
    angular.copy(sessions.newSession, sessions.currentSession);
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
