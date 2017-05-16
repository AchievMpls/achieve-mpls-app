myApp.controller('AdminUsersController', ['AdminService', '$mdDialog','$mdPanel',
function(AdminService, $mdDialog, $mdPanel, mdPanelRef){
console.log('Admin Users sourced: ');
  var users = this;
  /**
     * @global object that limits table's display length
     */
     users.query = {
      order: 'name',
      limit: 25,
      page: 1
    };


  /**
  * Admin Users Controller
  * @desc controls the Admin Users View
  * @param AdminService
  * @return AllUser objects
  */
  AdminService.getAllUsers();
  users.allUsers = AdminService.allUsers;
  console.log('users', users.allUsers);
  /**
   * @desc displays a popup when 'delete' button is clicked, then
   * deletes specific user if popup is confirmed
   * @param the user object to be deleted
   */
  users.confirmDelete = function(user) {
    //console.log('get in delete', user);
    var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete ' + user.fname + ' ' + user.lname + '?')
      .textContent('This will remove the form forever.')
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      AdminService.deleteUser(user.id);
    });
  };

    /**
       * @desc routes through items.js to add a new dictionary entry.
       * @param {object} item - The entry to be added (specified in AdminController.)
       */
      users.sendUser = function(user) {

        console.log('user', user);
        // $http.post('/items/add', item).then(function(response) {
        //   getAllItems();
        // });
      };

      /**
      * @desc routes through items.js to update a preexisting dictionary entry.
      * @param {object} item - The entry to be altered (specified in AdminController.)
      */
      users.editUser = function(user) {
        console.log('edit user', user);
        editingUser = true;
         users.fname = user.fname;
         users.lname = user.lname;
         users.role = user.role;
         users.email = user.email;
        // userToSend.id = user.id;
      };



/**
 * @global object that limits table's display length and orders by first name
 */

  users.query = {
   order: 'fname',
   limit: 25,
   page: 1
 };

  //hard coding data for the dropdown menus. this will be removed later
  // users.roleArray = ['9', '12'];
  users.roleArray = ['coach', 'admin'];
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
