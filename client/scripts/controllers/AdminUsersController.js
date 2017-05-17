myApp.controller('AdminUsersController', ['AdminService', 'AuthService', '$mdDialog','$mdPanel',
function(AdminService, AuthService, $mdDialog, $mdPanel, mdPanelRef){
console.log('Admin Users sourced: ');
  var users = this;

    /**
     * @global object that limits table's display length and orders by first name
     */
      users.query = {
       order: 'fname',
       limit: 25,
       page: 1
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
        session_id : '',
        grade : ''
      };
    };

    /**
    * @global tells the program whether we are editing the form or not.
    * If the form is being edited it sends the form on a different route.
    */
    var editingUser = false;

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
    console.log('get in delete', user.id);
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
        if (!user.fname || !user.lname ) {
          completeFields();
          return;
        }
        else {
            if (user.id !== undefined) {
              console.log('update', user.id);
              AdminService.updateUser(user);
            }
            else {
              console.log('add');
              AdminService.addNewUser(user);

            }
        }

      };

      /**
      * @desc displays an alert dialog if a form is incomplete
      */

      function completeFields() {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Incomplete form!')
          .textContent('Please the missing field.')
          .ariaLabel('Alert Dialog')
          .ok('OK!')
        );
      }


/**
 * @desc calls function to send email to user to activate account or reset password
 * @param {object} user - selected by ng-click on 'send activation' button
 */
  users.activeUser = AuthService.sendActivation;


  //hard coding data for the dropdown menus. this will be removed later

  users.roleArray = ['coach', 'admin'];
  users.sessionArray = [1,2,3,4,5,6,7,8,9,10];
  users.gradeArray = ['9', '12'];


  //the rest of this is code to get $mdPanel to work.
  this._mdPanel = $mdPanel;




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
      session_id : user.session_id,
      grade : user.grade,
      id: user.id
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
