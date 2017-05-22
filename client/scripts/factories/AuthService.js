/**
 * Auth Service Factory
 * @desc Manages all of the functions related to Authorization
 * @param $http, $location
 * @return the user is logged in
 */
myApp.factory('AuthService', ['$http', '$location', '$mdDialog',
  function($http, $location, $mdDialog) {
    // var code = {}; // CC possibly passed to pass param to validate chance code
/**
 * sendActivation function
 * @desc Send email and activation code to coach
 * @param userObject from input fields in 'send activation' button adminUser.html
 * @return success response code
 */
    function sendActivation(userObject) {
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
     * loginUser function
     * @desc authenticate the username and pwd
     * @param user Object from input fields in login.html
     * @return success to let coach view
     */
  function loginUser(user) {
    console.log('get me here', user);
    $http.post('/', user).then(function(response) {
          console.log('RESPONSE: ', response.data);
          if(response) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/adminHome');
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
      loginUser: loginUser,
      registerAdmin: registerAdmin,
      addUserPwd: addUserPwd

    };

  }]);
