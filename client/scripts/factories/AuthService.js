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
    var sendActivation = function(userObject) {
      console.log('AuthService line 11', userObject);
      $http.post( '/mail' , userObject ).then(function(response){
      console.log( 'Email sent: ', response.data );
  });

};

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


    return {
      sendActivation : sendActivation,
      // validateCode : validateCode
    };
  }]);
