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
 * @global object that limits table's display length and orders by first name
 */

  users.query = {
   order: 'fname',
   limit: 25, // does not yet limit to 25 users, don't know why
   page: 1
 };

  //hard coding data for the dropdown menus. this will be removed later
  users.roleArray = ['9', '12'];
  users.sessionArray = [1,2,3,4,5,6,7,8,9,10];

  //the rest of this is code to get $mdPanel to work.
  this._mdPanel = $mdPanel;

  /**
  * @global default object for the user.
  */
  users.user = {
    fname : '',
    lname : '',
    email : '',
    role : '',
    session : ''
  };

  /**
  * @desc clears all ng-model fields
  */
  users.clearFields = function () {
    users.user = {
      fname : '',
      lname : '',
      email : '',
      role : '',
      session : ''
    };
  };

  /**
  * @desc displays an item for editing
  * @param {object} user the user to be edited
  * @return saves the user selected as the user.  This will show up on the edit screen
  * with double binding.
  */
  users.editUser = function(user) {
    console.log(user);
    users.clearFields();
    editingForm = true;
    users.user = {
      fname : user.fname,
      lname : user.lname,
      email : user.email,
      role : user.role,
      session : user.session
    };
  };
  /**
  * @function Add User function
  * @param {object} user either a new user or a user to be edited
  * @return clears the form and sends the user to the DB
  */
  users.addUser = function(user) {
    users.toggleForm();
    users.clearFields();
  };

  /**
  * @function On Key Press
  * @desc when the focus is on the window and the escape key is pressed, the form
  * is closed.
  * @param event
  * @return the @class ng-hide and aria-hidden are added to the form-container.
  * the @function clearFields is called to clear the fields on the form.
  */
  window.onkeydown = function(event) {
    var itemToClose = document.getElementById('form-container');
    if (event.keyCode === 27) {
      itemToClose.classList.add("ng-hide");
      itemToClose.setAttribute("aria-hidden", true);
      users.clearFields();
    }
  };

  /**
  * @function Toggle form
  * @desc toggles the form from visible to hidden.
  * @param used on the ng-click of both the add form and edit form.
  * @return toggles the class ng-hide on form-container.
  */
  users.toggleForm = function () {
    var itemToOpen = document.getElementById('form-container');
    itemToOpen.classList.toggle("ng-hide");
  };

}]);
