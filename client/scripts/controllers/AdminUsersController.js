/**
 * Admin Users Controller
 * @desc controls the Admin Users View
 * @param AdminService
 * @return AllUser objects
 */

myApp.controller('AdminUsersController', ['AdminService', 'AuthService', '$mdDialog', '$mdPanel',
  function(AdminService, AuthService, $mdDialog, $mdPanel, mdPanelRef) {
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
     * @desc {object} sessionYear
     * @param {number} uniques and {number} currentYear
     */
    users.sessionYear = AdminService.sessionYear;

    /**
     * @desc selects all sessions for a single school year
     * @param {number} year the year whose sessions are to be returned
     */
    users.getYearsSessions = AdminService.getYearsSessions;

    /**
     * @desc {object} that contains the current year and the unique years with deactivated and all users
     * @return populated by the populateYearDropdown function and used in the Admin User View
     * also called within @function getSessionYears
     */
    users.yearDropdown = AdminService.yearDropdown;

    /**
     * @desc {object} that has the sessions and the completed exit tickets
     */
    users.specificYear = AdminService.specificYear;

    /**
     * @desc takes the user to a new view displaying
     * student view landing page, or from an individual entry.
     * @param {number} session_id the session whose events are to be returned
     */
    users.routeToEvents = AdminService.routeToEvents;

    /**
     * @desc {object} that contains all of the users
     */
    users.allUsers = AdminService.allUsers;
    /**
     * @desc splits array of users between years
     * @param array of users and year
     * @return new {array} that includes
     */
    users.filterUserArray = AdminService.filterUserArray;

    /**
     * @desc {array} with all of the users
     */
    users.userArray = AdminService.userArray;

    /**
     * @desc clears all ng-model fields
     */
    users.clearFields = function() {
      users.user = {
        fname: '',
        lname: '',
        email: '',
        role: '',
        session: {
          session_count: '',
          session_id: '',
        },
        year: ''
      };
    };

    /**
     * @global tells the program whether we are editing the form or not.
     * If the form is being edited it sends the form on a different route.
     */
    users.editingUser = false;


    /**
     * @function deactivateUser
     * @desc displays a popup when 'delete' button is clicked, then
     * deletes specific user if popup is confirmed
     * @param the user object to be deleted
     */
    users.deactivateUser = function(user) {
      AdminService.deactivateUser(user, function(rows) {
        users.allUsers = rows;
      });
    };

    /**
    * @function createSessionObject
    * @desc compares the session_count with the sessionArray and creates a session {object}
    * @param number for session_count
    * @return {object} with session_count and session_id
    */
    var _session = {};

    users.createSessionObject = function (session) {
      (users.sessionArray).forEach(function (_obj){
        if (_obj.session_count == session){
          _session = {
            session_count: _obj.session_count,
            session_id: _obj.session_id
          };
        } else {
          return;
        }
      });
    };

    /**
     * @desc routes through items.js to add a new dictionary entry.
     * @param {object} item - The entry to be added (specified in AdminController.)
     */
    users.sendUser = function(user) {
      users.createSessionObject(user.session.session_count);
      // console.log('_session is ', _session);
    var lowercaseEmail = user.email.toLowerCase();
    var userToSend = {};
    if (user.role === 'coach'){
      userToSend = {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: lowercaseEmail,
        role: user.role,
        session_count: _session.session_count,
        session_id: _session.session_id,
        year: user.year,
        password: user.password
      };
    } else {
      userToSend = {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: lowercaseEmail,
        role: user.role,
        session_count: '',
        session_id: '',
        year: '',
        password: user.password
      };
    }
      console.log('user to send is ', userToSend);
      if (!user.fname || !user.lname) {
        completeFields();
        return;
      } else {
        users.toggleForm();
        if (user.id !== undefined) {
          AdminService.updateUser(userToSend, function(rows) {
            users.editingUser = false;
            users.allUsers = rows;
          });
        } else {
          AdminService.addNewUser(userToSend, function(rows) {
            users.allUsers = rows;
          });

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
    //  users.activeUser = AuthService.sendActivation;

    users.activeUser = function(user) {
      // console.log('sending the email: ', user);
      var _alert = $mdDialog.confirm()
        .title('You are inviting ' + user.fname + ' ' + user.lname + ' to join AchieveMpls.')
        // .title('Your code has been sent to ' + user.email + '.')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(_alert).then(function() {
        AuthService.sendActivation(user);
      });
    };

    /**
     * @desc displays a popup when 'delete' button is clicked, then
     * deletes specific admin if popup is confirmed
     * @param {object} user the admin to be deleted
     */
    users.confirmDelete = function(user) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this administrator?')
        .textContent('This will remove the administrator forever.')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        // console.log("user id and role are: ", user.id, user.role);
        AdminService.deleteAdmin(user.id);
      });
    };

    users.roleArray = ['coach', 'admin'];
    users.sessionArray = [];

    /**
     * @function populate session array
     * @desc populates the session array with the number of sessions available for that year.
     * @param the total number of sessions
     * @return sessionArray populated with numbers based on number of sessions
     */
    users.populateSessionArray = function() {
      if (users.sessionArray.length > 0) {
        users.sessionArray.length = 0;
      }
      var array = users.specificYear.sessions;
      for (var i = 0; i < array.length; i++) {
        var _session = {
          session_count: array[i].session_count,
          session_id: array[i].id
        };
        users.sessionArray.push(_session);
      }
    };

    //the rest of this is code to get $mdPanel to work.
    this._mdPanel = $mdPanel;


    /**
     * @desc displays an item for editing
     * @param {object} user the user to be edited
     * @return saves the user selected as the user.  This will show up on the edit screen
     * with double binding.
     */
    users.editUser = function(user) {
      users.clearFields();
      users.editingUser = true;
      users.user = {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        session: {
          session_count: parseInt(user.session_count),
          session_id: user.session_id
        },
        year: user.year,
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
     * @function On click
     * @desc closes popup when clicked outside
     * @param click
     * @return hides the popup form
     */
    document.getElementById('users-background-darken').onclick = function() {
      var itemToClose = document.getElementById('form-container');
      itemToClose.classList.add('ng-hide');
      itemToClose.setAttribute('aria-hidden', true);
      users.clearFields();
    };

    /**
     * @function Toggle form
     * @desc toggles the form from visible to hidden.
     * @param used on the ng-click of both the add form and edit form.
     * @return toggles the class ng-hide on form-container.
     */
    users.toggleForm = function() {
      var itemToOpen = document.getElementById('form-container');
      itemToOpen.classList.toggle("ng-hide");
    };

    users.falseUser = function() {
      users.editingUser = false;
    };

  }
]);
