/**
* Admin Home Controller
* @desc controls the Admin Home View
* @param AdminService
* @return
*/

myApp.controller('AdminHomeController', ['AdminService',
function(AdminService){
  var home = this;
  home.tenScale = [1,2,3,4,5,6,7,8,9,10];
  var chosenYear = '';
  home.filterParams = {};
  home.sessionYear = AdminService.sessionYear;
  AdminService.getSessionYears();

  home.getYearsTickets = AdminService.getYearsTickets;
  home.specificYear = AdminService.specificYear;

  home.getYearsSessions = AdminService.getYearsSessions;

  home.filterTickets = function() {
    //transforms data from the "coach ratings" checkboxes from an object to an array of arrays
    var ratingsArray = Object.keys(home.filterParams.ratings).map(function(data){
        return [data, home.filterParams.ratings[data]];
    });
    //pushes any numbers whose checkboxes had been checked into a new array
    home.filterParams.ratingsTruthyArray = [];
    for (var i = 0; i < ratingsArray.length; i++) {
      if (ratingsArray[i][1]) {
        home.filterParams.ratingsTruthyArray.push(parseInt(ratingsArray[i][0]));
      }
    }
    //deletes the original "coach ratings" checkbox-data object
    delete home.filterParams.ratings;
    //passes the filter-data to the server
    AdminService.getFilteredTickets(home.filterParams);
  };

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
    fname : '',
    lname : '',
    email : '',
    session_id : '',
    year : '',
    session_count : '',
    grade : '',
    facilitator : '',
    day : '',
    start_time : '',
    school : '',
    event_id : '',
    date_form_completed : '',
    q1_answer : '',
    q2_answer : '',
    q3_answer : '',
    q4_answer : '',
    q5_answer : ''
  };

  home.populateTicket = function (ticket){
    home.clearFields();
    home.currentTicket = {
      fname : ticket.fname,
      lname : ticket.lname,
      email : ticket.email,
      session_id : ticket.session_id,
      year : ticket.year,
      session_count : ticket.session_count,
      grade : ticket.grade,
      facilitator : ticket.facilitator,
      day : ticket.day,
      start_time : ticket.start_time,
      school : ticket.school,
      event_id : ticket.event_id,
      date_form_completed : ticket.date_form_completed,
      q1_answer : ticket.q1_answer,
      q2_answer : ticket.q2_answer,
      q3_answer : ticket.q3_answer,
      q4_answer : ticket.q4_answer,
      q5_answer : ticket.q5_answer,
    };
    console.log(home.currentTicket);
  };

  home.clearFields = function () {
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

}]);
