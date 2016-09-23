var shopApp = angular.module('shopApp', ['ngRoute', 'ngCookies', 'duScroll', 'ui.bootstrap']);
var url = "http://localhost:3000/";

shopApp.run(function($rootScope, $cookies, $http) {
	$rootScope.$on("$locationChangeStart", function(event, next, current) {
		var userToken = $cookies.getObject('userToken');
		console.log(userToken);
		if ((userToken) && (userToken !== "")) {
			console.log('userToken from cookies found!');
			$http.post(url + 'getUser', {
				userToken: userToken
			}).then(function success(rspns) {
				console.log("Succesfully retrieved user data");
				console.log(rspns);
				$rootScope.loggedIn = 1;
				$rootScope.userData = rspns.data.obj;
			}, function fail(rspns) {
				console.log("Failed to retrieve user data");
				console.log(rspns);
				$rootScope.loggedIn = 0;
			});
		} else {
			console.log("no user token found from cookies");
			$rootScope.loggedIn = 0;
		}
	});
});

shopApp.controller('indexCtrl', function($rootScope, $scope, $http) {
	$scope.isCollapsed = 1;
	console.log("indexCtrl loaded");
	// $scope.signOut = fucntion() {

	// };

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
	.when('/signout', {
		templateUrl:'views/signout.html',
		controller: 'signoutCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

});