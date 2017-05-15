/**
 * Admin Events Controller
 * @desc controls the AdminEvents View
 * @param AdminService
 * @return
 */

myApp.controller('AdminEventsController', ['AdminService', '$mdDialog',
  function(AdminService, $mdDialog) {
    var events = this;
    console.log('AdminEventsController sourced');
    // events.currentSessionForEvents = AdminService.currentSessionForEvents;
    AdminService.getSessionsEvents();
    events.specificSession = AdminService.specificSession;

    /**
     * @global object that limits table's display length
     */
     events.query = {
      order: 'name',
      limit: 25,
      page: 1
    };



    // sessions.sessionYear = AdminService.sessionYear;
    // AdminService.getSessionYears();
    //
    // sessions.getYearsSessions = AdminService.getYearsSessions;
    // sessions.specificYear = AdminService.specificYear;
    //
    // /**
    //  * @global object that limits table's display length
    //  */
    //  sessions.query = {
    //   order: 'name',
    //   limit: 25,
    //   page: 1
    // };
    //
    // sessions.routeToEvents = AdminService.routeToEvents;


  }
]);
