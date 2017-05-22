/**
* {service} Coach Service
* @desc handles things related to the coaches
* @param $http, $location, $mdDialog
* @return the exit tickets
*/

myApp.factory('CoachService', ['$http', '$location', '$mdDialog',
function($http, $location, $mdDialog) {


  /**
  * @function Get Tickets
  * @desc gets the open tickets for the coach
  * @param sends the user
  * @return brings back all the tickets for the particular user and pushes them
  * into the ticketArray.
  */
  function getTickets(userResponse) {
    console.log('in get tickets path: ', userResponse.data);
    $http.get('/coach/:' + userResponse.data.username).then(function(response) {
    var tickets = response.data;
    createTicketArray (tickets);
    });
  }

  /**
  * @desc ticketArray
  * @param tickets from the database
  * @return provides the array of tickets that are used in the ng-repeat in coach.html
  */
  var ticketArray = [];

  function createTicketArray (ticket) {
    for (var i = 0; i < ticket.array.length; i++){
      ticketArray.push(ticket.array[i]);
    }
  }

  /**
  * @function Ticket To Send
  * @desc posts completed ticket to the DB
  * @param completed ticket
  * @return gets the remaining tickets for the user.
  */
  function ticketToSend(completedTicket) {
    $http.post('/coach/completedTicket', completedTicket).then(function(response) {
      console.log('ticket sent');
    });
  }

  return {
    getTickets : getTickets,
    ticketToSend : ticketToSend,
    ticketArray : ticketArray
  };
}
]);
