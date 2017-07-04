/**
 * Auth Service Factory
 * @desc Manages all of the functions related to Authorization
 * @param $http, $location
 * @return the user is logged in
*/

myApp.factory('AuthService', ['$http', '$location', '$mdDialog', 'CoachService', '$filter',
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
      console.log('exp', chance_expiration);
      chance_expiration.setDate(chance_expiration.getDate() + 30);
      userObject.chance_expiration = $filter('date')((chance_expiration), "yyyy-MM-dd");
      console.log('expiryDate is: ', userObject.chance_expiration);
      console.log('AuthService line 11', userObject);
      $http.post( '/mail' , userObject ).then(function(response){
      console.log( 'Email sent: ', response.data );
    });
  }
    /**
     * clearance function
     * @desc function to run server GET request for client side user validation
     * @param Object 'user'
     * @return success response code
     */
var clearance = function(){
  $http.get('/users/clearance').then(function(response) {
      if(response.data.email && (response.data.role === 'admin')) {
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
    console.log('hit coach clearance: ', response.data.email, response.data.role);
      if (response.data.email && (response.data.role === 'coach')) {
        console.log('HERE ',response.data.role);
      } else {
        // Store the activation code for later use
        // code.tempCode = $route.current.params.code;
        // console.log('Activation code: ', $route.current.params.code);

        // user has no session, bounce them back to the login page
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
      $http({
        method: 'GET',
        url: '/register',
        params: user
      })
      .then(function(response) {
        if(response.data.length !== 0) {
          user.userId = response.data[0].id;
          $http.post('/register/addPwd', user).then(function(response) {
             $location.path('/coach');
          });
        } else {
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('The active code is expired!')
            .textContent('Please contact the AchieveMpls Admin.')
            .ariaLabel('Alert Dialog')
            .ok('OK!')
          );
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
    console.log('get me here', user);

    $http.post('/', user).then(function(response) {
          console.log('RESPONSE: ', response.data);
          if(response) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            if(response.data.username && (response.data.role === 'admin')) {
                // user has a current session on the server
                userObject.role = response.data.role;
                userObject.email = response.data.username;
                userObject.id = response.data.id;
                console.log('User Data: ', userObject);
                $location.path("/home");
            } else if (response.data.username && (response.data.role === 'coach')) {
              console.log('ROLE:', response.data.role);
              coach.session_id = response.data.session_id;
              coach.user_id = response.data.user_id;
              console.log('coach post assignment: ', coach);
              auth.getTickets(response.data);
              $location.path("/coach");
            } else {
              console.log("get here if login isn't successsssss");
              // Store the activation code for later use
              // code.tempCode = $route.current.params.code;
              // console.log('Activation code: ', $route.current.params.code);
              // user has no session, bounce them back to the login page
              $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Login Issue!')
                .textContent('Your email or passwork incorrect')
                .ariaLabel('Alert Dialog')
                .ok('OK!')
              );
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
    console.log('registerAdmin', admin);
    $http.post('/register/admin', admin).then(function(response) {
          console.log('RESPONSE: ', response.data);
          if(response.data == 'OK') {
            console.log('success: ', response.data);
            $location.path('/login');
          } else {
            console.log('failure: ', response);
          }
        });
      }
    return {
      sendActivation : sendActivation,
      clearance : clearance,
      coachClearance : coachClearance,
      loginUser: loginUser,
      registerAdmin: registerAdmin,
      addUserPwd: addUserPwd,
      coach: coach
    };

  }
]);
