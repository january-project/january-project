var app = angular.module("NSApp", ["ngRoute", "NSAuth", "NSNationService", 'googlechart']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/home.html',
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
    .when('/home', {
      templateUrl: 'home/home.html'
    })
  	.when('/profile', {
	  templateUrl: 'profile/profile.html',
	  controller: 'ProfileController'
  	})
  	.when('/nation', {
	  templateUrl: 'nation/nation.html',
	  controller: 'NationController'
  	})
    .when('/self-identify', {
    templateUrl: 'self-identify/self-identify.html',
    controller: 'SelfIdentifyController'
    })

});
