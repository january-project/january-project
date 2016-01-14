var app = angular.module("NSApp", ["ngRoute", "NSAuth"]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: "home/home.html",
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'SignupController'
    })
    .when('/login', {
      templateUrl: 'auth/login.html',
      controller: 'LoginController'
    })
    .when('/logout', {
      template: '',
      controller: 'LogoutController'
    })
});
