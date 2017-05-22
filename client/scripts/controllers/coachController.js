/**
* Coach Controller
* @desc controls the Coach View
* @param AdminService, AuthService
* @return
*/

myApp.controller('coachController', ['CoachService', 'AuthService', '$mdDialog', '$mdPanel',
function(CoachService, AuthService, $mdDialog, $mdPanel, mdPanelRef) {
  var coach = this;

  coach.ticketToSend = CoachService.ticketToSend;
  coach.getTickets = CoachService.getTickets;

  /**
  * @this {object} will be replaced by the object that comes back from the database.
  * @desc there is an ng-repeat that goes through the array of open tickets that are brought back from the DB
  * each ticket should have a "name" parameter.  If there is a different parameter that comes back
  * {change} the parameter of {ticket.name} to the appropriate name
  */
  coach.openTickets = CoachService.ticketArray;





  /**
  * @var ticketToComplete
  * @desc {object} that is created to hold the data from the ticket.  Double
  * binding happens with this.
  */
  coach.ticketToComplete = {};
  /**
  * @function Select ticket
  * @desc populates the object ticketToComplete with the data from the ticket
  * @param {object} ticket
  * @return angular.copy the ticket into ticketToComplete
  */
  coach.selectTicket = function (ticket) {
    angular.copy(ticket, coach.ticketToComplete);
    console.log(coach.ticketToComplete);
  };

  /**
  * @function Submit answers
  * @desc submits answers to the DB
  * @param {object} answer that has the answers in the format of
  * question : answer
  * @return ideally, submit to DB.  Also closes the form on submit.
  */
  coach.submitAnswers = function (answers) {
    console.log('answers are: ', answers);
    //what gets put in this comes from ticketToComplete and the answer object
    var objectToSend = {
      user_id : coach.ticketToComplete.user_id,
      event_id : coach.tietToComplete.event_id,
      date_form_completed : moment().format(MM/DD/YYYY),
      answers : answers
    };
  console.log('Object To Send is ', objectToSend);
    coach.ticketToSend(objectToSend);

    var emptyTicket = {};
    angular.copy(emptyTicket, coach.ticketToComplete);
    coach.toggleForm();
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
