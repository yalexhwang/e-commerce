var shopApp = angular.module('shopApp', ['ngRoute', 'ngCookies', 'duScroll', 'ui.bootstrap']);
var url = "http://localhost:3000/";

// shopApp.factory('userDataFactory', ['$http', '$q', '$cookies', function($http, $q, $cookies) {
// 	var userData = {};
// 	userData.getData = function(inOrNot) {
// 		var loggedIn = inOrNot;
// 		var token = $cookies.get('token');
// 		console.log(token);
// 		if (token) {
// 			console.log(token);
// 			if (loggedIn) {
// 				return true;
// 			} else {
// 				var now = Date.now();
// 				var tokenTime = token.time;
// 				if (now - tokenTime > 180000) {
// 					$cookies.put('token', "");
// 					return false;
// 				} else {
// 					return token;
// 				}
// 			}
// 		} else {
// 			var def = $q.defer();
// 			$http.post(url + 'createToken')
// 			.then(function success(rspns) {
// 				console.log(rspns);
// 				var token = {
// 					token: rspns.data.token,
// 					time: rspns.data.time
// 				};
// 				$cookies.put('token', token);
// 				def.resolve(rspns);
// 			}, function fail(rspns) {
// 				console.log(rspns);
// 				console.log("Failed to create a token");
// 				def.reject(rspns);
// 			});
// 			return def.promise;
// 		}
// 	};
// 	return userData;
// }]);

shopApp.controller('indexCtrl', function($scope) {
	$scope.loggedIn = 0;
	// $scope.loggedIn = 1;
	$scope.isCollapsed = 1;
	$scope.cartOpen = 0;
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
	.when('/cart', {
		templateUrl: 'temp-views/cart.html',
		controller: 'cartCtrl'
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
	.otherwise({
		redirectTo: '/'
	});

});