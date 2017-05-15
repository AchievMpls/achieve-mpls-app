/**
 * Admin Sessions Controller
 * @desc controls the Admin Sessions View
 * @param AdminService
 * @return
 */

myApp.controller('AdminSessionsController', ['AdminService', '$mdDialog',
  function(AdminService, $mdDialog) {
    var sessions = this;
    var chosenYear = '';
    console.log('AdminSessionsController sourced');

    sessions.sessionYear = AdminService.sessionYear;
    AdminService.getSessionYears();

    sessions.getYearsSessions = AdminService.getYearsSessions;
    sessions.specificYear = AdminService.specificYear;

    /**
     * @global object that limits table's display length
     */
     sessions.query = {
      order: 'name',
      limit: 25,
      page: 1
    };

    sessions.routeToEvents = AdminService.routeToEvents;


  }
]);
