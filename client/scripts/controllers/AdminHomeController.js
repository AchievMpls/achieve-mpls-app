/**
* Admin Home Controller
* @desc controls the Admin Home View
* @param AdminService
* @return
*/

myApp.controller('AdminHomeController', ['AdminService',
function(AdminService){
  var home = this;

  var chosenYear = '';
  home.filterParams = {};
  home.sessionYear = AdminService.sessionYear;
  AdminService.getSessionYears();

  home.getYearsTickets = AdminService.getYearsTickets;
  home.specificYear = AdminService.specificYear;


  home.filterTickets = function() {
    var ratingsArray = Object.keys(home.filterParams.ratings).map(function(data){
        return [data,home.filterParams.ratings[data]];
    });
    home.filterParams.ratingsTruthyArray = [];
    for (var i = 0; i < ratingsArray.length; i++) {
      if (ratingsArray[i][1]) {
        home.filterParams.ratingsTruthyArray.push(ratingsArray[i][0]);
      }
    }
    delete home.filterParams.ratings;
    console.log('in controller, params are: ', home.filterParams);
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


}]);
