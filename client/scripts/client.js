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
  $mdThemingProvider.theme('default')
    .accentPalette('red');

  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/adminHome',
      controller: 'home as AdminHomeController',
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
