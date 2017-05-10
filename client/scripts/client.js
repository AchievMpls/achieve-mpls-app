/**
* Client Config file
* @desc setus up the configuration of angular for the app
* @param ngRoute, ngMaterial, ngMessages.
* @return angular.module, myApp.filter, myApp.config
*/

console.log('client.js sourced');
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

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
    .otherwise({
      redirectTo: 'home'
    });
}]);
