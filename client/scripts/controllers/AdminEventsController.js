/**
 * Admin Events Controller
 * @desc controls the AdminEvents View
 * @param AdminService
 * @return
 */

myApp.controller('AdminEventsController', ['AdminService', '$mdDialog',
  function(AdminService, $mdDialog) {
    var events = this;
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

    /**
     * @desc popup to confirm event delete
     * @param {number} eventID - The event to be removed &
     * session's events to be displayed
     * @TODO: refactor all the various delete popups across the controllers
     * into one service-based popup with a switch statement
     */
    events.confirmDelete = function(eventID) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this event?')
        .textContent('This will remove the event forever.')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        AdminService.deleteEvent(eventID);
      });
    };

  }
]);
