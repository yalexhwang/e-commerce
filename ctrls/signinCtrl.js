shopApp.controller('signinCtrl', function($scope, $rootScope, $http, $location, $cookies, $anchorScroll) {
	if ($rootScope.loggedIn === 1) {
		$location.path('/account');
	}

	$scope.signin = function() {
		var username = $scope.username;
		var password = $scope.password;
		console.log(username + ", " + password);
		$http.post(url + 'signin', {
			username: username,
			password: password
		}).then(function success(rspns) {
			if (rspns.data.passFail === 1) {
				var userToken = rspns.data.obj.token;
				$cookies.put('userToken', userToken); 
				console.log($cookies.get('userToken'));
				$location.path('/');
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