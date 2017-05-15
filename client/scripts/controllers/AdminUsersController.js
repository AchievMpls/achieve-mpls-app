/**
* Admin Users Controller
* @desc controls the Admin Users View
* @param AdminService
* @return AllUser objects
*/


//eh commented --pls delete when everything deleted
// myApp.controller('AdminUsersController', ['$scope', '$http', '$location',
// '$mdDialog', 'AdminService', function($scope, $http, $location, $mdDialog, AdminService){


myApp.controller('AdminUsersController', ['AdminService', '$mdPanel',
function(AdminService, $mdPanel, mdPanelRef){
console.log('Admin Users sourced: ');
  var users = this;


  AdminService.getAllUsers();
  users.allUsers = AdminService.allUsers;
  console.log('users', users.allUsers);

  /**
   * @desc displays an item for editing
   * @param {object} form the form to be edited
   */
  users.editUser = function(user) {
    editingUser = true;
    users.fname = user.fname;
    users.lname = user.lname;
    users.role = user.role;
    users.email = user.email;
    users.session_id = user.session_id;
    userToSend.id = user.id;
  };


  //hard coding data for the dropdown menus. this will be removed later
  users.roleArray = ['9', '12'];
  users.sessionArray = [1,2,3,4,5,6,7,8,9,10];

  //the rest of this is code to get $mdPanel to work.
  this._mdPanel = $mdPanel;


  users.showDialog = function(el) {
    var target = el.target;
    var position = this._mdPanel.newPanelPosition()
        .absolute()
        .center();

    var config = {
      attachTo: angular.element(document.body),
      templateUrl: 'views/partials/newUserForm.html',
      panelClass: 'demo-dialog-example',
      position: position,
      trapFocus: true,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: true
    };

    this._mdPanel.open(config);
  };


    this._mdPanelRef = mdPanelRef;


  users.closeDialog = function() {
    this._mdPanelRef && this._mdPanelRef.close().then(function() {
      angular.element(document.querySelector('.demo-dialog-open-button')).focus();
    });
  };

}]);
