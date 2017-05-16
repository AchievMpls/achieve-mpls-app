/**
 * Auth Service Factory
 * @desc Manages all of the functions related to Authorization
 * @param $http, $location
 * @return the user is logged in
 */
myApp.factory('AuthService', ['$http', '$location', '$mdDialog',
  function($http, $location, $mdDialog) {

/**
 * sendActivation function
 * @desc Send email and activation code to coach
 * @param activateObject from input fields in 'send activation' button adminUser.html
 * @return success response code
 */
    var sendActivation = function(info) {
      console.log('AuthService line 11', info);
      // $http.post( '/mail' , info ).then(function(response){
      // console.log( 'Email sent: ', response.data );
  // });
};

    return {
      sendActivation : sendActivation
    };
  }]);
