/**
* Client Config file
* @desc setus up the configuration of angular for the app
* @param ngRoute, ngMaterial, ngMessages.
* @return angular.module, myApp.filter, myApp.config
*/

console.log('client.js sourced');
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'md.data.table', 'ngAria']);
/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', '$mdThemingProvider',
      function($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  $mdThemingProvider.theme('default')
    .accentPalette('red');

  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/adminHome.html',
      controller: 'AdminHomeController as home',
    })
    .when('/forms', {
      templateUrl: '/views/templates/adminForms.html',
      controller: 'AdminFormsController as forms',
    })
    .when('/sessions', {
      templateUrl: '/views/templates/adminSessions.html',
      controller: 'AdminSessionsController as sessions',
    })
    .when('/adminUsers', {
      templateUrl: '/views/templates/adminUsers.html',
      controller: 'AdminUsersController as users',
    })
    .when('/users', {
      templateUrl: '/views/users.html',
      controller: 'UserController as user',
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
