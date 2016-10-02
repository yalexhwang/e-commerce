shopApp.controller('checkoutCtrl', function($scope, $rootScope, $cookies, $location, $http) {
	if ($cookies.getObject('charge') && $cookies.getObject('cartPurchased')) {
		$scope.charge = $cookies.getObject('charge');
		var cart = $cookies.getObject('cartPurchased');
		$scope.cartArr = cart.items;
		$scope.cartTotalItems = cart.qty;
		$scope.cartTotal = cart.total;
		var now = new Date();
		console.log(now);
		var mo = now.getMonth() + 1;
		var day = now.getDay();
		var yr = now.getFullYear();
		var time = now.getHours() + ":" + now.getMinutes();
		$scope.orderedAt = mo + "/" + day + "/" + yr + ", " + time;
	} else {
		$location.path('/account');
	}
});