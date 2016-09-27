shopApp.controller('accountCtrl', function($scope, $rootScope, $cookies, $http, $location, $anchorScroll) {
	$scope.openInfoEdits = 0;
	$scope.openEditMyInfoMessage = 0;
	$scope.openUpdatedPlanInfo = 0;
	if ($rootScope.loggedIn === 1) {
		console.log($rootScope.userData);
		$scope.user = $rootScope.userData;
		$scope.user.plan.delivery.detail = deliveryDetailConverter($rootScope.userData.plan);
	} else {
		$location.path('/signin');
	}

	$scope.editMyInfo = function() {
		if ($scope.openInfoEdits == 0) {
			$scope.openInfoEdits = 1;
			var states = document.getElementsByClassName('optionState');
			for (var i = 0; i < states.length; i++) {
				if (states[i].innerHTML == $scope.user.address.state) {
					document.getElementsByClassName('optionState')[i].setAttribute('selected', 'selected');
				}
			}
		} else {
			$scope.openInfoEdits = 0;
		}
	};
	$scope.saveEditedMyInfo = function() {
		var udUsername;
		var udEmail;
		var udPW;
		var udName;
		var udAdd1;
		var udAdd2;
		var udCity;
		var udState;
		var udZip;
		if ($scope.updatedPassword == $scope.updatedPasswordConfirm) {
			if ($scope.updatedName) {
				udUsername = $scope.updatedName;
			} else {
				udUsername = document.getElementById('update-username').getAttribute('value');
			}
			if ($scope.updatedEmail) {
				udEmail = $scope.updatedEmail;
			} else {
				udEmail = document.getElementById('update-email').getAttribute('value');
			}
			if ($scope.updatedPW) {
				udPW = $scope.updatedPW;
			} else {
				udPW = document.getElementById('update-pw').getAttribute('value');
			}
			if ($scope.updatedAdd1) {
				udAdd1 = $scope.updatedAdd1;
			} else {
				udAdd1 = document.getElementById('update-add1').getAttribute('value');
			}
			if ($scope.updatedAdd2) {
				udAdd2 = $scope.updatedAdd2;
			} else {
				udName = document.getElementById('update-add2').getAttribute('value');
			}
			if ($scope.updatedCity) {
				udCity = $scope.updatedCity;
			} else {
				udCity = document.getElementById('update-city').getAttribute('value');
			}
			if ($scope.updatedState) {
				udState = $scope.updatedState;
			} else {
				udSate = document.getElementById('update-state').getAttribute('value');
			}
			if ($scope.updatedZip) {
				udZip = $scope.updatedZip;
			} else {
				udZip = document.getElementById('update-zip').getAttribute('value');
			}
			//http call to update in DB
			var updatedInfo = {
				username: udUsername,
				password: udPW,
				email: udEmail,
				address: {
					name: udName,
					line1: udAdd1,
					line2: udAdd2,
					city: udCity,
					state: udState,
					zip: udZip
				};
				
			}

		} else {
			$scope.openEditMyInfoMessage = "Please re-enter password.";
			$scope.openUpdatedPlanInfo = 1;
		}
		console.log($scope.updatedUsername);
		console.log($scope.updatedEmail);
		console.log($scope.updatedPassword);
		console.log($scope.updatedPasswordConfirm);
		console.log($scope.updatedName);
		console.log($scope.updatedAdd1);
		console.log($scope.updatedAdd2);
		console.log($scope.updatedCity);
		console.log($scope.updatedState);
		console.log($scope.updatedZip);
	};

	$scope.cancelEditMyInfo = function() {
		$scope.openInfoEdits = 0;
	}
	//when user made change in calculator before signing in
	var planUpdate = $cookies.getObject('memberPlan');
	if (planUpdate) {
			$scope.planUpdate = planUpdate;
			$scope.planUpdate.delivery.detail = deliveryDetailConverter(planUpdate);
			$scope.openUpdatedPlanInfo = 1;
	}
	$scope.editMyPlan = function() {
		if (planUpdate) {
			$scope.planUpdate = planUpdate;
			$scope.planUpdate.delivery.detail = deliveryDetailConverter(planUpdate);
			$scope.openUpdatedPlanInfo = 1;
			console.log("Add later - what to do with saved plan data");			
		} else {
			$location.path('/calculator');
		}
	};

	$scope.saveUpdatedPlan = function() {
		$http.post('saveMyPlan', {
			plan: planUpdate,
			token: $cookies.get('userToken')
		}).then(function success(rspns) {
			console.log(rspns.data);
			alert("Your plan has been successfully updated.");

		}, function fail(rspns) {
			console.log(rspns);
			alert("Sorry, try again.");
		});
	};
	$scope.discardUpdatedPlanInfo = function() {
		$cookies.putObject('memberPlan', '');
		console.log("discardUpdatedPlanInfo: ");
		console.log($cookies.getObject('memberPlan'));
		$scope.planUpdate = "";
		$scope.openUpdatedPlanInfo = 0;
	};

});