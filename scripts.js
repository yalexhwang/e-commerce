var shopApp = angular.module('shopApp', ['ngRoute', 'ngCookies', 'duScroll', 'ui.bootstrap']);
var url = "http://yalexhwang.com:3000/";

shopApp.factory('userDataFactory', ['$http', '$q', function($http, $q) {
	var userData = {};
	var def = $q.defer();
	userData.getData = function(token) {
		var userToken = token;
		$http.post(url + 'getUser', {
			userToken: userToken
		}).then(function success(rspns) {
			console.log("Succesfully retrieved user data");
			def.resolve(rspns);
		}, function fail(rspns) {
			console.log("Failed to retrieve user data");
			def.reject(rspns);
		});
		return def.promise;
	}
	return userData;
}]);

shopApp.service('logInStatus', function() {
	var loggedIn = 0;
	return {
		setStatus: function(status) {
			loggedIn = status;
		},
		getStatus: function() {
			return loggedIn;
		}
	};
});


shopApp.controller('indexCtrl', function($scope, logInStatus) {
	var logIn = logInStatus.getStatus();
	console.log(logIn);

	if (logIn === 1) {
		$scope.loggedIn = 1;
	} else {
		$scope.loggedIn = 0;
	}
	$scope.isCollapsed = 1;
});

shopApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl:'views/main.html',
		controller: 'mainCtrl'
	})
	.when('/store', {
		templateUrl:'views/store.html',
		controller: 'storeCtrl'
	})
	.when('/cart', {
		templateUrl:'views/cart.html',
		controller: 'cartCtrl'
	})
	.when('/register', {
		templateUrl:'views/register.html',
		controller: 'registerCtrl'
	})
	.when('/signin', {
		templateUrl:'views/signin.html',
		controller: 'signinCtrl'
	})
	.when('/account', {
		templateUrl:'views/account.html',
		controller: 'accountCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

});