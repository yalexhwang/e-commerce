shopApp.controller('plansCtrl', function($scope, $location) {
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

	$scope.next = function() {
		if (calculated === 0) {
			return false;
		} else {
			console.log("Test");
			$scope.step2 = 1;
		}
		// $scope.step3 = 1;
	}

});