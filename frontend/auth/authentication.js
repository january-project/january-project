var app = angular.module('NSAuth', []);



app.service('TokenService', [function() {
  var userToken = 'token'

  this.saveToken = function(token) {
    sessionStorage[userToken] = token;
  }

  this.getToken = function() {
    return sessionStorage[userToken];
  }

  this.removeToken = function() {
    sessionStorage.removeItem(userToken);
  }
}]);



app.service('UserService', ['$http', 'TokenService', function($http, TokenService) {
    var baseUrl = 'http://dev.sandbox.com:5000/auth';

	this.currentUser = null;

    this.signup = function(user) {
        return $http.post(baseUrl + '/signup', user);
    }

    this.login = function(user) {
        return $http.post(baseUrl + '/login', user).then(function(response) {
            TokenService.saveToken(response.data.token);
            return response;
        });

    }

    this.logout = function() {
        TokenService.removeToken();
		this.currentUser = null;
    }

	this.changingUser = function(changeUser) {
		changeUser._id = this.currentUser._id;
		return $http.put('http://localhost:5000/api/user/' + changeUser._id, changeUser).then(function(response) {
			return response;
		});
	}

	this.isAuthenticated = function() {
    return !!TokenService.getToken();
  }
}]);



app.factory('AuthInterceptor', ['$q', '$location' ,'TokenService', function($q, $location, TokenService) {
    var interceptor = {
        request: function(config) {
            var token = TokenService.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        },
        responseError: function(response) {
            if (response.status === 401) {
                TokenService.removeToken();
                $location.path('/login');
            }
            $q.reject(response);
        }
    }
  return interceptor;
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
}]);
