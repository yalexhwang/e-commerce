shopApp.controller('accountCtrl', function($scope, $http, $cookies, $location, $anchorScroll, userDataFactory, logInStatus) {
	var logIn = logInStatus.getStatus();
	console.log("logIn: " + logIn);
	if (logIn === 1) {
		var userToken = $cookies.getObject('userToken');
		console.log("userToken: " + userToken);
		userDataFactory.getData(userToken)
		.then(function success(rspns) {
			console.log(rspns);
			$scope.user = rspns.data.obj;
			if ($scope.user.cart) {
				$scope.myCart = $scope.user.cart.cart;
				$scope.myCartCreatedAt = $scope.user.cart.createdAt;
			} else {
				$scope.noCart = 1;
			}
		}, function fail(rspns) {
			console.log(rspns.data.passFail + ": " + rspns.data.status);
			$location.path('/signin');
		});
	} else {
		$location.path('/signin');
	}
	
	$scope.jump = function(key) {
		$anchorScroll(key);
	};

	$scope.edit = function() {
		console.log("edit");
	};
	var cart = $cookies.getObject('cart');
	console.log(cart);
});