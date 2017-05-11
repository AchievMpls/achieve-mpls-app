myApp.factory('AdminService', ['$http', '$location', '$mdDialog', function($http, $location, $mdDialog) {

  function hello() {
    console.log('AdminService is sourced in');
  }

  function getAllUsers() {
    console.log('getAllUsers called');
    $http.get('/users/get').then(function(response) {
      // allItems.items = response.data;
    });

  }



  return{
    hello: hello,
    getAllUsers: getAllUsers,
  };
}]);
