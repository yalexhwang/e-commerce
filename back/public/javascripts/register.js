var shopApp = angular.module('shopApp', []);
shopApp.controller('registerCtrl', function($scope, $http) {
	var url = "http://localhost:3000/";

	$scope.register = function() {
		var username = $scope.username;
		var password = $scope.password0;
		var confirm = $scope.password1;
		var email = $scope.email;
		console.log(username);
		console.log(password);
		console.log(email);

		if (password !== confirm) {
			console.log("Password confirmation failed. (ADD LATER)");
		} else {
			$http.post(url + 'register', {
				username: username,
				password: password,
				email: email
			}).then(function success(rspns) {
				console.log(rspns);
				$scope.username = "";
				$scope.password0 = "";
				$scope.password1 = "";
				$scope.email = "";
			}, function fail(rspns) {
				console.log("Registration failed.");
			});
		}

	}
});