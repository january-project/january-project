var app = angular.module('NSNationService', []);

app.service('NationService', ['$http', function($http) { 
	
	this.send = function(nation) {
		return $http.post('http://localhost:9000/api/nation', nation).then(function(response) {
			return response;
		});
	};
	
}]);