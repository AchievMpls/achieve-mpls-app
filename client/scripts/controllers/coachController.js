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
    coach.submitAnswers = function(answers) {
      var objectToSend = {
        session_count: answers.session_count,
        session_id: answers.session_id,
        user_id: answers.user,
        event_id: answers.event_id,
        form_name: answers.form_name,
        form_id: answers.form_id,
        questions: answers.questions
      };
      console.log('objectToSend ', objectToSend);
      coach.ticketToComplete.length = 0;
      
        CoachService.ticketToSend(objectToSend);
    };

  }
]);
