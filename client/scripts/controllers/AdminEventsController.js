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
    console.log('the data for all of the forms is ', events.allForms.returnedForms);

    events.editingEvent = false;

    events.event = {
      meeting_count : '',
      form : '',
      open_date : undefined,
      close_date : undefined
    };

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
      events.clearFields();
      events.editingEvent = true;
      events.event = {
        meeting_count : event.meeting_count,
        form : event.form_id,
        open_date : event.date_form_open,
        close_date : event.date_form_close,
        id : event.id
      };
      events.toggleForm();
    };

    /**
    * @desc composes and submits a new/edited item
    */
    events.sendEvent = function(event) {
      var eventToSend = {
        meeting_count : parseInt(event.meeting_count, 10),
        form_id : event.form,
        open_date : $filter('date')(event.open_date, "yyyy-MM-dd"),
        close_date : $filter('date')(event.close_date, "yyyy-MM-dd"),
        id : event.id
      };
      if(isNaN(eventToSend.meeting_count)){
        AdminService.meetingConflictPopup();
        return;
      }
      if (events.editingEvent) {
        events.editingEvent = false;
        AdminService.updateEvent(eventToSend);
      }else {
        AdminService.addNewEvent(eventToSend);
      }
      events.clearFields();
      events.toggleForm();
    };

    /**
    * @function Clear Fields
    * @desc clears the event object out.
    * @param
    * @return returns an empty object.
    */
    events.clearFields = function () {
      events.event = {
        meeting_count : '',
        form : '',
        open_date : undefined,
        close_date : undefined
      };
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
        events.clearFields();
      }
    };

    /**
    * @function On click
    * @desc closes popup when clicked outside
    * @param click
    * @return hides the popup form
    */
    document.getElementById('events-background-darken').onclick = function() {
      var itemToClose = document.getElementById('form-container');
      itemToClose.classList.add('ng-hide');
      itemToClose.setAttribute('aria-hidden', true);
      events.clearFields();
    };

    /**
    * @function Toggle form
    * @desc toggles the form from visible to hidden.
    * @param used on the ng-click of both the add form and edit form.
    * @return toggles the class ng-hide on form-container.
    */
    events.toggleForm = function () {
      var itemToOpen = document.getElementById('form-container');
      itemToOpen.classList.toggle("ng-hide");
    };

    events.falseEvent = function () {
      events.editingEvent = false;
    };
  }//end controller function
]);
