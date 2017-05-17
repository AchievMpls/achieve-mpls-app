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

    sessions.days = ("Mondays Tuesdays Wednesdays Thursdays Fridays Saturdays Sundays").split(' ').map(function(day) {
        return {name: day};
      });

      /**
      * @desc displays a session for editing
      * @param {object} session the event to be edited
      */
      sessions.editSession = function(session) {
        sessions.editingSession = true;
        sessions.clearFields();
        sessions.session_count = session.session_count;
        sessions.grade = session.grade;
        sessions.facilitator = session.facilitator;
        sessions.day = session.day;
        sessions.start_time = session.start_time;
        sessions.school = session.school;
        sessionToSend.id = session.id;
      };


    sessions.sendSession = function() {
      sessionToSend.session_count = parseInt(sessions.session_count, 10);
      if(isNaN(sessionToSend.session_count)){
        AdminService.sessionConflictPopup();
        return;
      }
      sessionToSend.eventsToAdd = sessions.eventsToAdd;
      sessionToSend.grade = sessions.grade;
      sessionToSend.facilitator = sessions.facilitator;
      sessionToSend.day = sessions.day;
      sessionToSend.start_time = $filter('date')(sessions.start_time, "hh:mm");
      sessionToSend.school = sessions.school;
      sessionToSend.year = sessions.specificYear.sessions[0].year;
      if (sessions.editingSession) {
        sessions.editingSession = false;
        AdminService.updateSession(sessionToSend);
      }else {
        AdminService.addNewSession(sessionToSend);
      }

      sessions.clearFields();
    };//end sendSession

    sessions.clearFields = function () {
      sessions.session_count='';
      sessions.eventsToAdd='';
      sessions.grade=undefined;
      sessions.facilitator='';
      sessions.day=undefined;
      sessions.start_time=undefined;
      sessions.school='';
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
      sessionToSend.year = sessions.nextYear;
      sessionToSend.session_count=1;
      sessionToSend.eventsToAdd = 0;
      sessionToSend.grade = 9;
      sessionToSend.facilitator = "None";
      sessionToSend.day = "None";
      sessionToSend.start_time = "00:00:00";
      sessionToSend.school = "None";
      AdminService.addNewSession(sessionToSend);
    };

  }//end controller function
]);
