/**
 * Admin Home Controller
 * @desc controls the Admin Home View
 * @param AdminService
 * @return
 */

myApp.controller('AdminHomeController', ['AdminService',
  function(AdminService) {
    var home = this;
    home.tenScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var chosenYear = '';
    home.filterParams = {};

    /**
     * @desc {object} that contains the current year and the unique years with deactivated and all users
     * @return populated by the populateYearDropdown function and used in the Admin User View
     */
    home.sessionYear = AdminService.sessionYear;

    /**
     * @desc @function selects all tickets for a single school year
     * @param {number} year the year whose tickets are to be returned
     */
    home.getYearsTickets = AdminService.getYearsTickets;

    /**
     * @desc year object
     */
    home.specificYear = AdminService.specificYear;

    /**
     * @desc selects all sessions for a single school year
     * @param {number} year the year whose sessions are to be returned
     */
    home.getYearsSessions = AdminService.getYearsSessions;

    /**
     * @global object that limits table's display length
     */
    home.query = {
      order: 'name',
      limit: 25,
      page: 1
    };

    home.currentTicket = {};

    home.blankTicket = {
      fname: '',
      lname: '',
      email: '',
      session_id: '',
      year: '',
      session_count: '',
      grade: '',
      facilitator: '',
      day: '',
      start_time: '',
      school: '',
      event_id: '',
      date_form_completed: '',
      q1_answer: '',
      q2_answer: '',
      q3_answer: '',
      q4_answer: '',
      q5_answer: ''
    };

    home.populateTicket = function(ticket) {
      home.clearFields();
      home.currentTicket = {
        fname: ticket.fname,
        lname: ticket.lname,
        email: ticket.email,
        session_id: ticket.session_id,
        year: ticket.year,
        session_count: ticket.session_count,
        grade: ticket.grade,
        facilitator: ticket.facilitator,
        day: ticket.day,
        start_time: ticket.start_time,
        school: ticket.school,
        event_id: ticket.event_id,
        date_form_completed: ticket.date_form_completed,
        q1_answer: ticket.q1_answer,
        q2_answer: ticket.q2_answer,
        q3_answer: ticket.q3_answer,
        q4_answer: ticket.q4_answer,
        q5_answer: ticket.q5_answer,
      };
      console.log(home.currentTicket);
    };

    home.clearFields = function() {
      angular.copy(home.newSession, home.currentTicket);
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
        home.clearFields();
      }
    };

    /**
     * @function On click
     * @desc closes popup when clicked outside
     * @param click
     * @return hides the popup form
     */
    document.getElementById('home-background-darken').onclick = function() {
      var itemToClose = document.getElementById('form-container');
      itemToClose.classList.add('ng-hide');
      itemToClose.setAttribute('aria-hidden', true);
      home.clearFields();
    };

    /**
     * @function Toggle form
     * @desc toggles the form from visible to hidden.
     * @param used on the ng-click of both the add form and edit form.
     * @return toggles the class ng-hide on form-container.
     */
    home.toggleForm = function() {
      var itemToOpen = document.getElementById('form-container');
      itemToOpen.classList.toggle("ng-hide");
    };

  }
]);
