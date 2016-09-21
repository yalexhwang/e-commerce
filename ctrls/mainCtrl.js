shopApp.controller('mainCtrl', function($scope, $anchorScroll, $location, $cookies) {
	$scope.step2 = 0;
	$scope.step3 = 0;

	$scope.jump = function(key) {
		$anchorScroll(key);
	};

	$scope.calculated = 0;
	$scope.step2 = 0;
	$scope.step3 = 0;
	$scope.calculateIntake = function() {
		var weight = $scope.weight;
		var level = $scope.level;
		if ((weight === "") || (weight === undefined)) {
			return false;
		} else if ((level === "") || (level === undefined)) {
			return false;
		} else {
			$scope.calculated = 1;
			$scope.intake = (weight * level).toFixed(2);
			$scope.step2 = 1;
		}
	}
	$scope.openDay = 0;
	$scope.openDate = 0;
	$scope.openCustom = 0;
	$scope.getDeliveryOption = function() {
		var frequency = $scope.frequency;
		var whichDay = $scope.dayForWeekly;
		var howManyDays = $scope.daysForCustom;
		var starting = $scope.startingDate;
		if ((frequency == undefined) || (starting == undefined)) {
			return false;
		} else {
			console.log(frequency);
			console.log(whichDay);
			console.log(howManyDays);
			console.log(starting);
			$scope.step3 = 1;
			if (frequency === "Weekly") {
				$scope.totalIntake = Math.round($scope.intake * 7);

			$cookies.put('totalSupply', $scope.totalIntake);
			} else if (frequency === "Bi-weekly") {
				$scope.totalIntake = Math.round($scope.intake * 17);
			$cookies.put('totalSupply', $scope.totalIntake);
			} else if (frequency === "Custom") {
				$scope.totalIntake = Math.round($scope.intake * howManyDays);
				$scope.frequency = "Every " + howManyDays + " days";
			}
			console.log($scope.totalIntake);
			$cookies.put('totalSupply', $scope.totalIntake);
			var plan = {
				supplyOz: $scope.totalIntake,
				frequency: frequency,
				option1: whichDay,
				option2: howManyDays,
				startDate: 
			};
			$cookies.putObject('userPlan', plan);
		}
	};

	$scope.continueShopping = function() {
		$location.path('/store');
	}
})