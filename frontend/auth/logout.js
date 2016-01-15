var app = angular.module('NSApp');

app.controller("LogoutController", ["$location", "UserService", function($location, UserService) {
  UserService.logout();
  $location.path('/login');
}]);
