var shopApp = angular.module('shopApp', ['ngRoute', 'ngCookies', 'duScroll', 'ui.bootstrap']);

var url = "http://localhost:3000/";

shopApp.factory('userDataFactory', ['$http', '$q', function($http, $q) {
	var userDataFactory = {};
	userDataFactory.getData = function(inOrOut) {
		if (inOrOut) {
			var def = $q.defer();
			var token = $cookies.get('token');
			$http.get(url + '/getUser?token=' + token)
			.then(function success(rspns) {
				console.log(rspns);
				var time = rspns.data.obj.token.time;
				var now = Date.now();
				if ((now - time) > 180000) {
					return true;
				} else {
					return false;
				}
				def.resolve(rspns);
			}, function fail(rspns) {
				console.log(rspns);
				def.reject(rspns);
			});
			return def.promise;
		} else {
			return false;
		}
	}
	return userDataFactory;
}]);

shopApp.controller('indexCtrl', function($scope) {
	$scope.loggedIn = 0;
	$scope.isCollapsed = 1;
});

shopApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'temp-views/main.html',
		controller: 'mainCtrl'
	})
	.when('/store', {
		templateUrl: 'temp-views/store.html',
		controller: 'storeCtrl'
	})
	.when('/register', {
		templateUrl: 'temp-views/register.html',
		controller: 'registerCtrl'
	})
	.when('/signin', {
		templateUrl: 'temp-views/signin.html',
		controller: 'signinCtrl'
	})
	.when('/account', {
		templateUrl: 'temp-views/account.html',
		controller: 'accountCtrl'
	})
	.when('/payment', {
		templateUrl: 'temp-views/payment.html',
		controller: 'paymentCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

});