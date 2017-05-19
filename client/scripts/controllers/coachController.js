/**
* Coach Controller
* @desc controls the Coach View
* @param AdminService, AuthService
* @return
*/

myApp.controller('coachController', ['AdminService', 'AuthService', '$mdDialog', '$mdPanel',
function(AdminService, AuthService, $mdDialog, $mdPanel, mdPanelRef) {
  var coach = this;
  /**
  * @this {object} will be replaced by the object that comes back from the database.
  * @desc there is an ng-repeat that goes through the array of open tickets that are brought back from the DB
  * each ticket should have a "name" parameter.  If there is a different parameter that comes back
  * {change} the parameter of {ticket.name} to the appropriate name
  */
  coach.openTickets = [
    {name : 'default', questions : ['q1', 'q2', 'q3', 'q4']},
    {name : 'default2', questions : ['dq1', 'dq2', 'dq3']}
  ];

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
      name : coach.ticketToComplete.name,
      answers : answers

    };

    console.log('Object To Send is ', objectToSend);
    //put function to send to DB right here
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
