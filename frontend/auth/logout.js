var app = angular.module('NSApp');

app.controller("LogoutController", ['$location', '$scope', 'UserService', function($location, $scope, UserService) {

  UserService.logout();
  $location.path('/');

}]);
