/**
* Client Config file
* @desc setus up the configuration of angular for the app
* @param ngRoute, ngMaterial, ngMessages.
* @return angular.module, myApp.filter, myApp.config
*/

console.log('client.js sourced');
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAria']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', '$mdThemingProvider',
      function($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  $mdThemingProvider.theme('default');

  $routeProvider
    .when('/home', {
      templateUrl: '',
      controller: '',
    })
    .when('/users', {
      templateUrl: '/views/users.html',
      controller: 'UserController as user',
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
