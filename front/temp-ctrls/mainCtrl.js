shopApp.controller('mainCtrl', function($scope, $anchorScroll, $location, $cookies, userDataFactory) {
	$scope.step2 = 0;
	$scope.step3 = 0;
	// userDataFactory.getData(loggedIn)
	// .then(function success(rspns) {
	// 	console.log(rspns);
	// }, function fail(rspns) {
	// 	console.log(rspns);
	// });
	$scope.jump = function(key) {
		$anchorScroll(key);
	}


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
			$cookies.put('intake', $scope.intake);
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
			} else if (frequency === "Bi-weekly") {
				$scope.totalIntake = Math.round($scope.intake * 17);
			} else if (frequency === "Custom") {
				$scope.totalIntake = Math.round($scope.intake * howManyDays);
				$scope.frequency = "Every " + howManyDays + " days";
			}
		}
		
	};







})