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

  sessions.sessionYear = AdminService.sessionYear;
  AdminService.getSessionYears();

  sessions.getYearsSessions = AdminService.getYearsSessions;
  sessions.specificYear = AdminService.specificYear;

  sessions.routeToEvents = AdminService.routeToEvents;


  var daysList = ["Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays", "Sundays"];

  var time = {
    hours : 24,
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
      hours : '',
      minutes : '',
      school : session.school,
      id : session.id,
      year : session.year
    };
    splitTime (session.start_time);
    sessions.toggleForm();
  };

  function prepareTime (time) {
    start_time = time.hours + ':' + time.minutes;
  }

  function splitTime (time) {
    console.log(time);
    var splitTimeArray = time.split(':');
    console.log(splitTimeArray);
    sessions.currentSession.hours = (splitTimeArray[0]);
    sessions.currentSession.minutes = (splitTimeArray[1]);
  }

  sessions.sendSession = function(session) {
    console.log('the session that we are trying to send is ', session);
    session.session_count = parseInt(session.session_count, 10);
    if(isNaN(session.session_count) && (sessions.editingSession === false)){
      AdminService.sessionConflictPopup();
      return;
    }
    var sessionToSend = {
      eventsToAdd : session.eventsToAdd,
      grade : session.grade,
      facilitator : session.facilitator,
      day : session.day,
      start_time : session.hours + ':' + session.minutes,
      school : session.school,
      year : sessions.sessionYear.currentYear,
      session_count : session.session_count,
      id : session.id
    };
    console.log('session to send is ', sessionToSend);
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

}//end controller function
]);
