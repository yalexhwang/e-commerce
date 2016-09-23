shopApp.controller('accountCtrl', function($scope, $rootScope, $cookies, $location, $anchorScroll) {
	console.log($rootScope.loggedIn);
	if ($rootScope.loggedIn) {
		var user = $rootScope.userData;
		$scope.user = user;
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