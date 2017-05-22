/**
 * Auth Service Factory
 * @desc Manages all of the functions related to Authorization
 * @param $http, $location
 * @return the user is logged in
 */
myApp.factory('AuthService', ['$http', '$location', '$mdDialog', '$filter',
  function($http, $location, $mdDialog, $filter) {
    // var code = {}; // CC possibly passed to pass param to validate chance code
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
     * addUserPwd function
     * @desc add the user Pwd
     * @param user Object from input fields in submit button createPassword.html
     * @return success redirect to login page
     */
    function addUserPwd(user) {
      $http.post('/register/addPwd', user).then(function(response) {
         $location.path('/login');
      });
    }
/**
 * validateCode function
 * @desc validates authorization code with db
 * @param chance code from $routeParams
 * @return success response code
 */
 // function validateCode(authCode) {
 //   console.log('AuthService validateCode', authCode);
 //   $http.put( '/mail' , authCode ).then(function(response){
 //   console.log( 'Code Validated: ', response.data );
 // });
 // }
    /**
     * validUser function
     * @desc authenticate the username and pwd
     * @param user Object from input fields in login.html
     * @return success to let coach view
     */
  function validUser(user) {
    console.log('get me here', user);
    $http.post('/login', user).then(function(response) {
          console.log('RESPONSE: ', response.data);
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/adminHome');
          } else {
            console.log('failure: ', response);
          //  var message = {'text': 'wrong passcode'};
            //login.message = "Wrong!!";
          }
        });
      }
    return {
      sendActivation : sendActivation,
      validUser: validUser,
      addUserPwd: addUserPwd
    };

  }]);
