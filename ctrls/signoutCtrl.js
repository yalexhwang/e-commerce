shopApp.controller('signoutCtrl', function($scope, $rootScope, $http, $cookies, $timeout, $location) {

	$scope.counter = 3;
	var userToken = $cookies.get('userToken');
	console.log(userToken);
	$http.post(url + 'removeToken', {
		userToken: userToken
	}).then(function success(rspns) {
		console.log('token removed, signed out');
		console.log(rspns);
		$cookies.put('userToken', "");
		$location.path('/');
	}, function fail(rspns) {
		console.log(rspns);
	});

	var countdown = function() {
		$scope.counter--;
		if ($scope.counter == 0) {
			$location.path('/');
		} else {
			$timeout(countdown, 1000);
		}
	};
	// countdown();

});