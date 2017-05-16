/**
 * Admin Events Controller
 * @desc controls the AdminEvents View
 * @param AdminService
 * @return
 */

myApp.controller('AdminEventsController', ['AdminService', '$mdDialog', '$filter',
  function(AdminService, $mdDialog, $filter) {
    var events = this;
    AdminService.getSessionsEvents();
    events.specificSession = AdminService.specificSession;
    AdminService.getAllForms();
    events.allForms = AdminService.allForms;

    var eventToSend = {};
    var editingEvent = false;

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

    /**
    * @desc displays an event for editing
    * @param {object} event the event to be edited
    */
    events.editEvent = function(event) {
      console.log('here the original event', event);
      editingEvent = true;
      events.clearFields();
      events.meeting_count = event.meeting_count;
      events.form_id= event.form_id;
      events.open_date= event.date_form_open;
      events.close_date=event.date_form_close;
      eventToSend.id = event.id;
    };

    /**
    * @desc composes and submits a new/edited item
    */
    events.sendEvent = function() {
      eventToSend.meeting_count = parseInt(events.meeting_count, 10);
      if(isNaN(eventToSend.meeting_count)){
        AdminService.meetingConflictPopup();
        return;
      }
      eventToSend.form_id = events.form_id;
      eventToSend.open_date = $filter('date')(events.open_date, "yyyy-MM-dd");
      eventToSend.close_date = $filter('date')(events.close_date, "yyyy-MM-dd");
      if (editingEvent) {
        editingEvent = false;
        console.log('here the updated event to send: ', eventToSend);
        AdminService.updateEvent(eventToSend);
      }else {
        AdminService.addNewEvent(eventToSend);
      }
      events.clearFields();
    };

    events.clearFields = function () {
      events.meeting_count = '';
      events.form_id='';
      events.open_date=undefined;
      events.close_date=undefined;
      eventToSend = {};
      console.log('post clear, eventToSend is: ', eventToSend);
    };

  }//end controller function
]);
