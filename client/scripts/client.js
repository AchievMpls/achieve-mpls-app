/**
* Client Config file
* @desc setus up the configuration of angular for the app
* @param ngRoute, ngMaterial, ngMessages.
* @return angular.module, myApp.filter, myApp.config
*/

console.log('client.js sourced');
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'md.data.table', 'ngAria', 'angular.filter']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', '$mdThemingProvider',
function($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');

  var logoRedMap = $mdThemingProvider.extendPalette('red', {
    '500' : 'AB182F',
  });

  $mdThemingProvider.definePalette('backgrounds', {
    //white
    //default button color
    '50': 'FFFFFF',

    //set as default, controls background
    '100': 'ebf1f5',


    //Selector of Dropdowns
    '200': 'EBF1F5',

    //Dark Gray
    //color of selector in md-datepicker
    '300': 'EBF1F5',

    //no apperent function
    //Gray
    '400': 'ffffff',
    '500': 'EBF1F5',
    '600': 'EBF1F5',
    '700': '656565',

    //controls text color in buttons
    //dark gray
    '800': '656565',
    '900': '656565',

    //background of dropdowns
    'A100': 'FFFFFF',

    //text color of md-datepicker
    'A200': '656565',

    //no apperent function
    'A400': 'EBF1F5',
    'A700': 'EBF1F5',

  })
  .definePalette('primaryColors', {
    //Cool Blue
    '50' : '5FC9F0',
    '100': '5FC9F0',
    '200': '5fC9F0',
    '300' : '5fC9F0',
    '400' : '5FC9F0',

    //Cool Green
    '500': '3DB862',

    //Primary Hover, text of dropdowns
    '600': '3DB862',

    '700': 'AB182F',
    '800': 'AB182F',
    '900': 'AB182F',
    'A100': '656565',
    'A200': '656565',
    'A400': '656565',
    'A700': '656565',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                    // on this palette should be dark or light

    'contrastDarkColors': ['50', '500', //hues which contrast should be 'dark' by default
    '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  })
  .definePalette('secondaryColors', {
    //Warm Yellow
    '50' : 'FFCE00',
    '100' : 'FFCE00',
    //Warm Orange
    '200' : 'F37629',
    '300' : '5FC9F0',
    '400': 'EBF1F5',
    '500': 'EBF1F5',
    '600': 'EBF1F5',
    '700': 'EBF1F5',
    '800': 'EBF1F5',
    '900': 'EBF1F5',
    'A100': '656565',
    'A200': '656565',
    'A400': '656565',
    'A700': '656565',
  })
  .definePalette('logoRed', logoRedMap)
  .theme('default')
  .primaryPalette('primaryColors', {
    'default' : '100',
    //color of the item in the dropdown the instant another item is selected
    'hue-1' : '500'
  })
  .accentPalette('secondaryColors', {
    'default' : '100',
    'hue-1' : '200'
  })
  .warnPalette('logoRed')
  .backgroundPalette('backgrounds', {
    //white
    'default': '100',
    //Gray
    'hue-1': '400',
    //dark gray
    'hue-3': '700',
  });


  $routeProvider

    .when('/login', {
      templateUrl: '/views/login.html',
      controller: 'UserAuthController as login',
      resolve: {
        clearance : ['AuthService', function(AuthService){
          return AuthService.clearance();
        }]
      }
    })
    .when('/createPassword/:code',{
      templateUrl: '/views/createPassword.html',
      controller: 'UserAuthController as code',
    })
    .when('/register',{
      templateUrl: 'views/register.html',
      controller: 'UserAuthController as admin',
    })
    .when('/forgotpw', {
      templateUrl: '/views/forgotPassword.html',
      controller: 'ForgotPasswordController as pw',
    })
    .when('/home', {
      templateUrl: '/views/templates/adminHome.html',
      controller: 'AdminHomeController as home',
      resolve: {
        clearance : ['AuthService', function(AuthService){
          return AuthService.clearance();
        }]
      }
    })
    .when('/forms', {
      templateUrl: '/views/templates/adminForms.html',
      controller: 'AdminFormsController as forms',
      resolve: {
        clearance : ['AuthService', function(AuthService){
          return AuthService.clearance();
        }]
      }
    })
    .when('/sessions', {
      templateUrl: '/views/templates/adminSessions.html',
      controller: 'AdminSessionsController as sessions',
      resolve: {
        clearance : ['AuthService', function(AuthService){
          return AuthService.clearance();
        }]
      }
    })
    .when('/events', {
      templateUrl: '/views/templates/adminEvents.html',
      controller: 'AdminEventsController as events',
      resolve: {
        clearance : ['AuthService', function(AuthService){
          return AuthService.clearance();
        }]
      }
    })
    .when('/adminUsers', {
      templateUrl: '/views/templates/adminUsers.html',
      controller: 'AdminUsersController as users',
      resolve: {
        clearance : ['AuthService', function(AuthService){
          return AuthService.clearance();
        }]
      }
    })
    .when('/coach', {
      templateUrl: '/views/coach.html',
      controller: 'coachController as coach',
      resolve: {
        coachClearance : ['AuthService', function(AuthService){
          return AuthService.coachClearance();
        }]
      }
    })
    .when('/logout', {
      controller: 'UserAuthController as user',
      template: '<h1 ng-init="user.logout()">logout</h1>',
    })
    .otherwise({
      redirectTo: 'login'
    });
}]);
