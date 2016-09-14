shopApp.controller('signinCtrl', function($scope, $http, $location, $cookies, userDataFactory) {
	$scope.failed = 0;
	$scope.loggedIn = 0;
	console.log("signinCtrl");
	

	$scope.signin = function() {
		var username = $scope.username;
		var password = $scope.password;
		console.log(username + ", " + password);
		$http.post(url + 'signin', {
			username: username,
			password: password
		}).then(function success(rspns) {
			console.log(rspns.data);
			if (rspns.data.passFail === 1) {
				var userData = rspns.data.obj;
				$scope.loggedIn = 1;
				$cookies.put('token', rspns.data.token);
				$cookies.put('time', rspns.data.time);
				$location.path('/account'); 
			} else {
				console.log(rspns.data.status);
				$scope.failed = 1;
				$scope.failedMessage = rspns.data.status;
			}
		}, function fail(rspns) {
			console.log(rspns);
			$scope.failed = 1;
			$scope.failedMessage = '??User name and password entered did not match. Please try again.';
			$scope.username = "";
			$scope.password = "";
		});
	}	

});