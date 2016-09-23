shopApp.controller('signoutCtrl', function($scope, $rootScope, $http, $cookies, $timeout, $location) {

	$scope.counter = 5;
	var countdown = function() {
		$scope.counter--;
		if ($scope.counter == 0) {
			var userToken = $cookies.getObject('userToken');
			console.log(userToken);
			$http.post(url + 'remove_token', {
				userToken: userToken
			}).then(function success(rspns) {
				console.log(rspns);
				$cookies.putObject('userToken', "");
				$location.path('/');
			}, function fail(rspns) {
				console.log(rspns);
			});
		} else {
			$timeout(countdown, 1000);
		}
	};
	countdown();

});