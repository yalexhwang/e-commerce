shopApp.controller('accountCtrl', function($scope, $http, $cookies, userDataFactory) {
	var userToken = $cookies.getObject('userToken');
	console.log(userToken);
	$http.post(url + 'account', {
		userToken: userToken
	}).then(function success(rspns) {
		console.log(rspns);
		var userData = rspns.data;
	}, function fail(rspns) {
		console.log("Connection failed");
	});
});