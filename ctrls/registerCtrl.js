shopApp.controller('registerCtrl', function($scope, $rootScope, $cookies, $http, $location) {
	if ($scope.loggedIn) {
		$location.path('/account');
	}
	$scope.hideDBID = 1;
	$scope.registered = 0;
	$scope.openDay = 0;
	$scope.openCustom = 0;
	$scope.option2Custom = 0;
	$scope.option2Week = 0;

	var userPlan = $cookies.getObject('newPlan');
	var custom;
	var weekBase;
	if (userPlan.delivery.option2.w_based == null) {
		custom = userPlan.delivery.option2.c_based; 
		userPlan.delivery.detail = "Every " + custom.interval + " days";
		userPlan.startDate = custom.start;
		$scope.option2Custom = 1;
	} else if (userPlan.delivery.option2.c_based.interval == null) {
		weekBase = userPlan.delivery.option2.w_based;
		var week = Number(userPlan.delivery.option2.w_based);
		switch(week) {
			case 1:
				week = "Monday";
				break;
			case 2:
				week = "Tuesday";
				break;
			case 3:
				week = "Wednesday";
				break;
			case 4:
				week = "Thursday";
				break;
			case 5:
				week = "Friday";
				break;
			case 6:
				week = "Saturday";
				break;
		}
		userPlan.delivery.detail = week;
		$scope.option2Week = 1;
	}
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

	$scope.register = function() {
		var username = $scope.username;
		var password = $scope.password;
		var confirm = $scope.password1;
		var email = $scope.email;
		var name = $scope.name;
		var add1 = $scope.add1;
		var add2 = $scope.add2;
		var city = $scope.city;
		var state = $scope.state;
		var zip = $scope.zip;
		var supplyOz = userPlan.supplyOz;
		var option1 = userPlan.delivery.option1;
		var whichDay = $scope.dayForWeekly;
		var howManyDays = $scope.daysForCustom;
		var starting = $scope.startingDate;
		var address = {
			name: name,
			line1: add1,
			line2: add2,
			city: city,
			state: state,
			zip: zip
		};
		var plan;
		if (custom) {
			plan = {
				supplyOz: userPlan.supplyOz,
				delivery: {
					option1: option1,
					option2: {
						w_based: null,
						c_based: {
							interval: custom.interval,
							start: custom. start
						}
					}
				}	
			};
		} else if (weekBase) {
			plan = {
				supplyOz: userPlan.supplyOz,
				delivery: {
					option1: option1,
					option2: {
						w_based: weekBase,
						c_based: {
							interval: null,
							start: null
						}
					}
				}	
			};
		}
		console.log(username);
		console.log(password);
		console.log(email);
		console.log(address);
		console.log(plan);
		if (password !== confirm) {
			$scope.verifyPW = 1;
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