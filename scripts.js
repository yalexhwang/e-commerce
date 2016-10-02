var shopApp = angular.module('shopApp', ['ngRoute', 'ngCookies', 'duScroll', 'ui.bootstrap']);
var url = "http://localhost:3000/";

shopApp.run(function($rootScope, $cookies, $http, $location, $route) {
	$rootScope.$on("$locationChangeStart", function(event, next, current) {
		var comingFrom = current.slice(-6);
		var goingTo = next.slice(-7);
		var userToken = $cookies.get('userToken');
		if ((userToken) && (userToken !== "")) {
			console.log('userToken from cookies found!');
			$http.post(url + 'getUser', {
				userToken: userToken
			}).then(function success(rspns) {
				console.log("Verifying token with DB - rspns returned with success, verifying token pass...");
				console.log(rspns);
				if (rspns.data.passFail === 1) {
					$rootScope.loggedIn = 1;
					$rootScope.userData = rspns.data.obj;
					console.log("$rootScope.loggedIn = " + $rootScope.loggedIn);
					console.log($rootScope.userData);
					if (comingFrom == 'signin') {
						$location.path('/account');
					}
					if (goingTo == 'account') {
						$route.reload();
					}
				} else {
					console.log("token pass failed...");
					console.log(rspns.data);
				}
			}, function fail(rspns) {
				console.log("rspns returned with error...");
				console.log(rspns);
				$rootScope.loggedIn = 0;
				console.log("$rootScope.loggedIn = " + $rootScope.loggedIn);
			});
		} else {
			console.log("userToken from cookies not available!");
			$rootScope.loggedIn = 0;
			console.log("$rootScope.loggedIn = " + $rootScope.loggedIn);
		}
	});
});

shopApp.service('PWservice', function($http, $q) {
	this.validate = function(password, username, item, newVal) {
		var def = $q.defer();
		$http.post(url +'validatePW', {
			password: password,
			username: username,
			item: item,
			newValue: newVal
		}).then(function success(rspns) {
			console.log(rspns.data);
			def.resolve(rspns);
		}, function fail(rspns) {
			console.log('PWservice failed');
			console.log(rspns);
			def.reject(rspns);
		});
		return def.promise;
	}
});

shopApp.controller('indexCtrl', function($rootScope, $scope) {
});

function deliveryDetailConverter(userDataPlan) {
	var dlvry = userDataPlan.delivery;
	if ((dlvry.option1 === "Weekly") || (dlvry.option1 === "Bi-weekly")) {
		var dayInWeek = Number(dlvry.option2.w_based);
		switch(dayInWeek) {
		case 1:
			dayInWeek = "Monday";
			break;
		case 2:
			dayInWeek = "Tuesday";
			break;
		case 3:
			dayInWeek = "Wednesday";
			break;
		case 4:
			dayInWeek = "Thursday";
			break;
		case 5:
			dayInWeek = "Friday";
			break;
		case 6:
			dayInWeek = "Saturday";
			break;
		}
		return "Every " + dayInWeek;
	} else if (dlvry.option1 === "Custom") {
		console.log(dlvry.option1);
		var interval = dlvry.option2.c_based.interval;
		var start = dlvry.option2.c_based.start.slice(0,10);
		return "Every " + interval + " days, starting from " + start;
	} 
}


shopApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl:'views/main.html',
		controller: 'mainCtrl'
	})
	.when('/calculator', {
		templateUrl:'views/calc.html',
		controller: 'calcCtrl'
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
		controller: 'accountCtrl',
		reloadOnSearch: true
	})
	.when('/signout', {
		templateUrl:'views/signout.html',
		controller: 'signoutCtrl'
	})
	.when('/checkout', {
		templateUrl:'views/checkout.html',
		controller: 'checkoutCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

});