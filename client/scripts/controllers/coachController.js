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
      console.log('here currentCoach: ', currentCoach);
      var objectToSend = {
        session_id: currentCoach.session_id,
        user_id: currentCoach.user_id,
        event_id: coach.tickets.open[0].id,
        answers: answers
      };
      if (isNaN(parseInt(objectToSend.answers[0], 10))) {
        console.log('dis triggered');
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Incomplete form!')
          .textContent('For Question 01, please include a numeric response between 1 and 10.')
          .ariaLabel('Alert Dialog')
          .ok('OK!')
        );
      } else {
        CoachService.ticketToSend(objectToSend);
        coach.ticketToComplete = [];
      }
    };

  }
]);
