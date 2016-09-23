shopApp.controller('registerCtrl', function($scope, $cookies, $http, $location) {
	$scope.hideDBID = 1;
	$scope.registered = 0;
	$scope.openDay = 0;
	$scope.openCustom = 0;
	
	$cookies.put('totalSupply', "");
	// var totalSupply = $cookies.get('totalSupply');
	// if ((totalSupply == undefined) || (totalSupply == null) || (totalSupply == "")) {
	// 	console.log('dd');
	// 	$location.path('#/#get');

	// } 
	var userPlan = $cookies.getObject('userPlan');
	console.log(userPlan)
	if ((userPlan) && (userPlan !== "")) {
		$scope.planData = 1;
		$scope.userPlan = userPlan;
		if (userPlan.option1 == undefined) {
			$scope.openCustomOption = 1;
			$scope.openWeekOption = 0;
		} else {
			$scope.openWeekOption = 1;
			$scope.openCustomOption = 0;
		}
	} else {
		$scope.planData = 0;
	}

	if ($scope.loggedIn) {
		$location.path('/account');
	}

	$scope.editPlan = function() {
		if ($scope.planData) {
			$scope.planData = 0;
		} else {
			$scope.planData = 1;
		}
	};

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
	var totalOz = userPlan.supplyOz;
	var frequency = $scope.frequency;
	var whichDay = $scope.dayForWeekly;
	var howManyDays = $scope.daysForCustom;
	var starting = $scope.startingDate;

	// $scope.go_to_test = function() {
	// 	if (username !== )
	// 	var temp_record = {

	// 	};
	// }

	$scope.register = function() {
		
		var address = {
			name: name,
			line1: add1,
			line2: add2,
			city: city,
			state: state,
			zip: zip
		};
		var plan = {
			supplyOz: totalOz,
			frequency: frequency,
			option1: whichDay,
			option2: howManyDays,
			startDate: starting
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
				address: address,
				plan: plan
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