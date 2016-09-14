shopApp.controller('mainCtrl', function($scope, $anchorScroll, $location, $cookies, userDataFactory) {
	$scope.openHow = 0;
	
	// userDataFactory.getData(loggedIn)
	// .then(function success(rspns) {
	// 	console.log(rspns);
	// }, function fail(rspns) {
	// 	console.log(rspns);
	// });
	$scope.jump = function(key) {
		$anchorScroll(key);
	}
})