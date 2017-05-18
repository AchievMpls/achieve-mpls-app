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
  home.sessionYear = AdminService.sessionYear;
  AdminService.getSessionYears();

  home.getYearsTickets = AdminService.getYearsTickets;
  home.specificYear = AdminService.specificYear;

  /**
  * @global object that limits table's display length
  */
  home.query = {
    order: 'name',
    limit: 25,
    page: 1
  };


}]);
