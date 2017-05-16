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
    var editingSession = false;

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
      console.log('here the package: ', sessionToSend);
      AdminService.addNewSession(sessionToSend);
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
      console.log('post clear, sessionToSend is: ', sessionToSend);
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

  }
]);
