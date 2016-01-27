var app = angular.module('NSNationService', []);

app.service('NationService', ['$http', function ($http) {
	var self = this;

	this.currentNation = {};

	this.send = function (nation) {
		if (nation.ideoType === 'Representative Democracy' || nation.ideoType === 'Direct Democracy' || nation.ideoType === 'Presidential Dictatorship' || nation.ideoType === 'Constitutional Dictatorship') {
			nation.leaderType = 'President';
		} else if (nation.ideoType === 'Absolute Monarchy' || nation.ideoType === 'Constitutional Monarchy') {
			nation.leaderType = 'King';
		} else if (nation.ideoType === 'Military Dictatorship') {
			nation.leaderType = 'General';
		} else if (nation.ideoType === 'Fascist Dictatorship') {
			nation.leaderType = 'Supreme Leader';
		} else if (nation.ideoType === 'Proletarian Dictatorship') {
			nation.leaderType = 'Chairman';
		}
		return $http.post('http://localhost:5000/api/nation', nation).then(function (response) {
			return response;
		});
	};

	this.getNation = function (user) {
		return $http.get('http://localhost:5000/api/nation/usernation/' + user._id).then(function (response) {
			self.currentNation = response.data;
			return response;
		});
	};

	this.setNation = function (nation) {
		self.currentNation = nation;
	};

	this.getFlags = function () {
		return $http.get('http://localhost:5000/flags').then(function (response) {
			return response;
		});
	};

}]);