/**
* {service} Coach Service
* @desc handles things related to the coaches
* @param $http, $location, $mdDialog
* @return the exit tickets
*/

myApp.factory('CoachService', ['$http', '$location', '$mdDialog',
function($http, $location, $mdDialog) {

  var tickets = {};

  /**
  * @function Get Tickets
  * @desc gets the open tickets for the coach
  * @param sends the user
  * @return brings back all the tickets for the particular user and pushes them
  * into the ticketArray.
  */
  function getTickets(user) {
    $http.get('/coach/tickets/' + user.session_count +'/'+user.user_id).then(function(response) {
      if (response.data){
        angular.copy(response.data, tickets);
      } else {
        var emptyObj = {};
        angular.copy(emptyObj, tickets);
      }
      console.log('tickets is ', response);
    });
  }

  /**
  * @function Ticket To Send
  * @desc posts completed ticket to the DB
  * @param completed ticket
  * @return gets the remaining tickets for the user.
  */
  function ticketToSend(completedTicket) {
    console.log('before post request ', completedTicket);
    $http.post('/coach/completedTicket', completedTicket).then(function() {
      console.log('in completed tickets response');
      getTickets(completedTicket);
    });
  }

  return {
    getTickets : getTickets,
    ticketToSend : ticketToSend,
    tickets: tickets
  };
}
]);
