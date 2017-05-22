/**
 * Auth Service Factory
 * @desc Manages all of the functions related to Authorization
 * @param $http, $location
 * @return the user is logged in
 */
myApp.factory('AuthService', ['$http', '$location', '$mdDialog',
  function($http, $location, $mdDialog) {
    var code = {};
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
 * clearance function
 * @desc function to run server GET request for client side user validation
 * @param Object 'user'
 * @return success response code
 */
var clearance = function(){
  console.log('inside clearance function');
  // $http.get('/users/clearance').then(function(response) {
  //   console.log('hit clearance: ', response);
  //     // if(response.data.email) {
  //     //     // user has a curret session on the server
  //     //     userObject.userName = response.data.email;
  //     //     userObject.id = response.data.id;
  //     //     console.log('User Data: ', userObject);
  //     // } else {
  //     //     // Store the activation code for later use
  //     //     // code.tempCode = $route.current.params.code;
  //     //     // console.log('Activation code: ', $route.current.params.code);
  //     //
  //     //     // user has no session, bounce them back to the login page
  //     //     $location.path("/home");
  //     // }
  // });
};

    return {
      sendActivation : sendActivation,
      clearance : clearance
    };
  }]);
