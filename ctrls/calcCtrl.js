shopApp.controller('calcCtrl', function($scope, $rootScope, $location, $cookies, $http){
	//Water Intake Calculator
	$scope.openStep1Msg = 0;
	$scope.step2ready = 0;
	$scope.calculateIntake = function() {
		var weight = $scope.weight;
		var level = $scope.hydrationLvl;
		if ((weight === "") || (weight === undefined)) {
			$scope.openStep1Msg = 1;
			$scope.step1Msg = "Please enter your weight."
		} else if ((level === "") || (level === undefined)) {
			$scope.openStep1Msg = 1;
			$scope.step1Msg = "Please select hydration level."
		} else {
			$scope.dailyIntake = (weight * level).toFixed(2);
			$scope.step2ready = 1;
		}
	};

	$scope.openStep2Msg = 0;
	$scope.step3ready = 0;
	$scope.openDay = 0;
	$scope.openDate = 0;
	$scope.openCustom = 0;
	var plan;
	$scope.getDeliveryOption = function() {
		var frequency = $scope.frequency;
		var whichDay = $scope.dayForWeekly;
		var howManyDays = $scope.daysForCustom;
		var startingDate = $scope.startingDate;
		console.log(frequency);
		console.log(whichDay);
		console.log(howManyDays);
		console.log(startingDate);
		if (frequency == undefined) {
			$scope.openStep2Msg = 1;
		} else if ((frequency === "Weekly") && (whichDay == undefined)) {
			$scope.openStep2Msg = 1;
		} else if ((frequency === "Bi-weekly") && (whichDay == undefined)) {
			$scope.openStep2Msg = 1;
		} else if ((frequency === "Custom") && (howManyDays == undefined)) {
			$scope.openStep2Msg = 1;
		} else if ((frequency === "Custom") && (startingDate == undefined)) {
			$scope.openStep2Msg = 1;
		} else {
			if (frequency === "Weekly") {
				$scope.totalIntake = Math.round($scope.dailyIntake * 7);
				howManyDays = null;
				startingDate = null;
			} else if (frequency === "Bi-weekly") {
				$scope.totalIntake = Math.round($scope.dailyIntake * 17);
				howManyDays = null;
				startingDate = null;
			} else if (frequency === "Custom") {
				$scope.totalIntake = Math.round($scope.dailyIntake * howManyDays);
				$scope.frequency = "Every " + howManyDays + " days";
				$scope.whichDay = null;
			}
			$cookies.put('totalIntake', $scope.totalIntake);
			switch(whichDay) {
				case 1:
						whichDay = "Mon";
						break;
				case 2:
						whichDay = "Tue";
						break;
				case 3:
						whichDay = "Wed";
						break;
				case 4:
						whichDay = "Thu";
						break;
				case 5:
						whichDay = "Fri";
						break;
				case 6:
						whichDay = "Sat";
						break;
			}
			plan = {
				supplyOz: $scope.totalIntake,
				delivery: {
					option1: frequency,
					option2: {
						w_based: whichDay,
						c_based: {
							interval: howManyDays,
							start: startingDate
						}
					}
				}
			};
			$scope.step3ready = 1;
		}
	};
  //calculator - step3 - buttons
	$scope.savePlan = function() {
		console.log('savePlan()');
		if ($rootScope.loggedIn) {
			$http.post('saveMyPlan', {
				plan: plan,
				token: $cookies.get('userToken')
			}).then(function success(rspns) {
				console.log(rspns.data);
				alert("Your plan has been successfully updated.");
			}, function fail(rspns) {
				console.log(rspns);
				alert("Sorry, try again.");
			});
		} else {
			$cookies.putObject('memberPlan', plan);
			console.log("savePlan - $cookies: ");
			console.log($cookies.getObject('memberPlan'));
			$location.path('/signin');
		}
	}
	$scope.saveNewPlan = function() {
		$cookies.putObject('newPlan', plan);
		console.log("saveNewPlan - $cookies: ");
		console.log($cookies.getObject('newPlan'));
		$location.path('/register');
	};
	
});