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

  home.filterTickets = function() {
    //transforms data from the "coach ratings" checkboxes from an object to an array of arrays
    var ratingsArray = Object.keys(home.filterParams.ratings).map(function(data){
        return [data,home.filterParams.ratings[data]];
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


}]);
