shopApp.controller('signinCtrl', function($scope, $http, $location, $cookies) {
	$scope.failed = 0;
	$scope.loggedIn = 0;
	
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
				var userToken = rspns.data.obj.token;
				console.log(userToken);
				$cookies.putObject('userToken', userToken);
				$scope.loggedIn = 1;
				$location.path('/account'); 
			} else {
				console.log(rspns.data.status);
				$scope.failed = 1;
				$scope.failedMessage = rspns.data.status;
				$scope.username = "";
				$scope.password = "";
			}
		}, function fail(rspns) {
			console.log(rspns);
			$scope.failed = 1;
			$scope.failedMessage = 'Oops, something went wrong. Please try again.';
			$scope.username = "";
			$scope.password = "";
		});
	}	

});