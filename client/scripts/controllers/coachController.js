/**
* Coach Controller
* @desc controls the Coach View
* @param AdminService, AuthService
* @return
*/

myApp.controller('coachController', ['CoachService', 'AuthService', '$mdDialog', '$mdPanel',
function(CoachService, AuthService, $mdDialog, $mdPanel, mdPanelRef) {
  var coach = this;

  var currentCoach = AuthService.coach;

  coach.tickets = CoachService.tickets;

  /**
  * @var ticketToComplete
  * @desc {object} that is created to hold the data from the ticket.  Double
  * binding happens with this.
  */
  coach.ticketToComplete = [];

  // /**
  // * @function Select ticket
  // * @desc populates the object ticketToComplete with the data from the ticket
  // * @param {object} ticket
  // * @return angular.copy the ticket into ticketToComplete
  // */
  // coach.selectTicket = function (ticket) {
  //   angular.copy(ticket, coach.ticketToComplete);
  //   console.log(coach.ticketToComplete);
  // };

  /**
  * @function Submit answers
  * @desc submits answers to the DB
  * @param {array} answer all answers provided
  * @return ideally, submit to DB.  Also closes the form on submit.
  */
  coach.submitAnswers = function (answers) {
    var objectToSend = {
      user_id : currentCoach.data.user_id,
      event_id : coach.tickets.open[0].id,
      answers : answers
    };
    console.log('Object To Send is ', objectToSend);
    CoachService.ticketToSend(objectToSend);
    CoachService.getTickets(currentCoach.data);
  };


  /**
  * @function Toggles the ticket
  * @desc toggles the form between visible and hidden.
  * @param used on the ng-click
  * @return toggles the class ng-hide on form-container.
  */
  coach.toggleForm = function() {
    var itemToOpen = document.getElementById('form-container');
    itemToOpen.classList.toggle("ng-hide");
  };
}
]);
