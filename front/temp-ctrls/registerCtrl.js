
shopApp.controller('registerCtrl', function($scope, $http) {
	$scope.hideDBID = 1;
	$scope.registered = 0;

	$scope.register = function() {
		var username = "test";
		var password = "1111111111";
		var confirm = "1111111111";
		var email = "test@gggg.com";
		var name = "Alex Hwang";
		var add1 = "3333 Piedmont Ave.";
		var add2 = "Suite 111";
		var city = "Atlanta";
		var state = "GA";
		var zip = "30308";
		var address = {
			name: name,
			line1: add1,
			line2: add2,
			city: city,
			state: state,
			zip: zip
		};
		console.log(username);
		console.log(password);
		console.log(email);
		if (password !== confirm) {
			console.log("Password confirmation failed. (>>ADD LATER)");
		} else {
			$http.post(url + 'register', {
				username: username,
				password: password,
				email: email,
				address: address
			}).then(function success(rspns) {
				var registered = rspns.data;
				console.log(rspns.data);
				$scope.registName = registered.username;
				$scope.registPW = registered.password;
				$scope.registEmail = registered.email;
				$scope.registAdd = registered.address;
				$scope.registered = 1;
				$scope.username = "";
				$scope.password0 = "";
				$scope.password1 = "";
				$scope.email = "";
				$scope.name = "";
			}, function fail(rspns) {
				console.log("Registration failed.");
				console.log(rspns.data);
			});
		}

	}
});