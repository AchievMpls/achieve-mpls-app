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

  /**
  * @function Submit answers
  * @desc submits answers to the DB
  * @param {array} answer all answers provided
  * @return ideally, submit to DB.  Also closes the form on submit.
  */
  coach.submitAnswers = function (answers) {
    var objectToSend = {
      session_id : currentCoach.data.session_id,
      user_id : currentCoach.data.user_id,
      event_id : coach.tickets.open[0].id,
      answers : answers
    };
    console.log('Object To Send is ', objectToSend);
    CoachService.ticketToSend(objectToSend);
  };

}
]);
