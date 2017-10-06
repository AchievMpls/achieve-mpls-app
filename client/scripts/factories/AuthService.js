/**
 * Auth Service Factory
 * @desc Manages all of the functions related to Authorization
 * @param $http, $location
 * @return the user is logged in
 */

myApp.factory('AuthService', [
  '$http',
  '$location',
  '$mdDialog',
  'CoachService',
  '$filter',
  function($http, $location, $mdDialog, CoachService, $filter) {

    var auth = this;
    auth.getTickets = CoachService.getTickets;
    var userObject = {};
    var coach = {};
    /**
     * sendActivation function
     * @desc Send email and activation code to coach
     * @param userObject from input fields in 'send activation' button adminUser.html
     * @return success response code
     */

    function sendActivation(userObject) {

      //set the expiration date for the chance
      var chance_expiration = new Date();
      chance_expiration.setDate(chance_expiration.getDate() + 30);
      userObject.chance_expiration = $filter('date')((chance_expiration), "yyyy-MM-dd");
      $http.post('/mail', userObject).then(function(response) {});
    }

    /**
     * @function registerAllCoaches
     * @desc Sends registration email to all coaches
     * @param year, chanceExp
     * @return sends email to all coaches with new pw link
     */
    function registerAllCoaches(year) {
      console.log('register fired!');
      var chanceExp = new Date();
      chanceExp.setDate(chanceExp.getDate() + 30);
      objectToSend = {
        chanceExp: $filter('date')((chanceExp), "yyyy-MM-dd"),
        year: year
      }
      $http.post('/mail/registerAll', objectToSend).then(function(response) {
        console.log('it worked!');
      });
    }
    /**
     * clearance function
     * @desc function to run server GET request for client side user validation
     * @param Object 'user'
     * @return success response code
     */
    var clearance = function() {
      $http.get('/users/clearance').then(function(response) {
        if (response.data.email && (response.data.role === 'admin')) {
          // user has a current session on the server
          userObject.role = response.data.role;
          userObject.email = response.data.email;
          userObject.id = response.data.id;
        } else {
          // Store the activation code for later use
          // code.tempCode = $route.current.params.code;
          // console.log('Activation code: ', $route.current.params.code);

          // user has no session, bounce them back to the login page
          $location.path("/login");
        }

      });
    };

    var coachClearance = function() {
      $http.get('/users/clearance').then(function(response) {
        if (response.data.email && (response.data.role === 'coach')) {
          console.log('in coach clearance route ', response.data);
          coach = {
            session_count: response.data.session_count,
            user_id: response.data.id
          };
          console.log('coach is ', coach);
          auth.getTickets(coach);
        } else {
          $location.path("/login");
        }

      });
    };
    /**
     * addUserPwd function
     * @desc add the user Pwd, if the chance expiration code is expired, notify the admin
     * if chance is valid, means the get function get the user record,
     * then, triggers post function and send the user object to register.js
     * @param user Object from input fields in submit button createPassword.html
     * @return success redirect to coach page
     */

    function addUserPwd(user) {
      $http.post('/register/addPwd', user).then(function(response) {
        $location.path('/login');
        console.log('add pwd user', user);
        $http({method: 'GET', url: '/register', params: user}).then(function(response) {
          if (response.data.length !== 0) {
            user.userId = response.data[0].id;
            $http.post('/register/addPwd', user).then(function(response) {
              $location.path('/coach');
            });
          } else {
            $mdDialog.show($mdDialog.alert().clickOutsideToClose(true).title('The active code is expired!').textContent('Please contact the AchieveMpls Admin.').ariaLabel('Alert Dialog').ok('OK!'));
          }
        });
      });
    }
    /**
     * loginUser function
     * @desc authenticate the username and pwd
     * @param user Object from input fields in login.html
     * @return success to let coach view
     * {CHANGE} there needs to be validation on whether a user is a coach or not.
     * if the user is a coach, it can go through {auth.getTickets} which is a plug-and-play
     * function that can be put wherever it needs to be in this factory.
     */
    function loginUser(user) {
      $http.post('/', user).then(function(response) {
        if (response) {
          if (response.data.username && (response.data.role === 'admin')) {
            // user has a current session on the server
            userObject = {
              role: response.data.role,
              email: response.data.username,
              id: response.data.id
            };
            $location.path("/home");
          } else if (response.data.username && (response.data.role === 'coach')) {
            coach = {
              session_id: response.data.session_count,
              user_id: response.data.user_id
            };
            $location.path("/coach");
          } else {
            $mdDialog.show($mdDialog.alert().clickOutsideToClose(true).title('Login Issue!').textContent('Your email or password were incorrect').ariaLabel('Alert Dialog').ok('OK!'));
            $location.path("/login");
          }

        } else {
          console.log('failure: ', response);
        }
      });
    }

    /**
     * registerAdmin function
     * @desc
     * @param
     * @return
     */
    function registerAdmin(admin) {
      $http.post('/register/admin', admin).then(function(response) {
        if (response.data == 'OK') {
          $location.path('/login');
        } else {}
      });
    }

    /**
     * @function forgot pw
     * @desc emails user the new password link
     * @param email
     * @return pw email sent
     */
    function forgotPW(email) {
      //set the expiration date for the chance
      var chance_expiration = new Date();
      chance_expiration.setDate(chance_expiration.getDate() + 30);
      userObject.chance_expiration = $filter('date')((chance_expiration), "yyyy-MM-dd");
      var emailToSend = {
        email: email,
        chance_expiration: chance_expiration
      }
      // console.log('email is ', email);
      $http.post('/mail/forgotpw', emailToSend).then(function(response) {
        $location.path('/login')
      });
    }

    return {
      sendActivation: sendActivation,
      registerAllCoaches: registerAllCoaches,
      clearance: clearance,
      coachClearance: coachClearance,
      loginUser: loginUser,
      registerAdmin: registerAdmin,
      addUserPwd: addUserPwd,
      coach: coach,
      forgotPW: forgotPW
    };

  }
]);
