shopApp.controller('accountCtrl', function($scope, $rootScope, $cookies, $http, $route, $location, $anchorScroll, PWservice) {

	$scope.openInfoEditOptions = 0;
	$scope.openInfoEdits = 0;
	$scope.openUserNameEdit = 0;
	$scope.openEmailEdit = 0;
	$scope.openPWEdit = 0;
	$scope.openAddressEdit = 0;

	$scope.openEditMyInfoMessage = 0;
	$scope.openUpdatedPlanInfo = 0;

	$scope.notSaved = 0;

	if ($rootScope.loggedIn === 1) {
		$scope.user = $rootScope.userData;
		$scope.user.plan.delivery.detail = deliveryDetailConverter($rootScope.userData.plan);
		$scope.totalOz = $scope.user.plan.supplyOz;
		$scope.cartArr = $rootScope.userData.cart.items;
		$scope.cartTotal = $rootScope.userData.cart.total;
		$scope.cartTotalItems = $rootScope.userData.cart.qty;
		$scope.currentOz = $rootScope.userData.cart.oz;
		if ($scope.cartArr.length > 0) {
			$scope.noCart = 0;
		} else {
			$scope.noCart = 1;
		}
	} else {
		$location.path('/signin');
	}

	if ($cookies.getObject('cart')) {
		if ($cookies.getObject('cart').items.length > 0) {
			$scope.cartAvailable = 1;
		} else {
			$scope.cartAvailable = 0;
		}
	} else {
		$scope.cartAvailable = 0;
	}

// My Info -----------------------------------------------
// (Username) - - - - - - - - - - - - - - - - - - - - - - -
	$scope.openInfoEditOptions = function() {
		if ($scope.openInfoEdits == 0) {
			$scope.openInfoEdits = 1;
		} else {
			$scope.openInfoEdits = 0;
		}
	};

	$scope.editUserName = function() {
		if ($scope.openUserNameEdit == 0) {
			$scope.openUserNameEdit = 1;
			$scope.openEmailEdit = 0;
			$scope.openPWEdit = 0;
			$scope.openAddressEdit = 0;
		} else {
			$scope.openUserNameEdit = 0;
		}
	};
	$scope.saveUserName = function() {
		if (($scope.updatedUserName !== undefined) && ($scope.updatedUserName !== "")) {
			if (($scope.userNamePW !== undefined) && ($scope.userNamePW !== "")) {
				var pw = $scope.userNamePW;
				var username = $scope.user.username;
				if (username !== "test") {
					PWservice.validate(pw, username, 'username', $scope.updatedUserName)
					.then(function success(rspns) {
						if (rspns.data.passFail === 1) {
							$location.path('/signin');
						} else {
							$scope.editMyInfoMessage = "Please re-enter your password.";
							$scope.openEditMyInfoMessage = 1;
						}
					}, function fail(rspns) {
						$scope.editMyInfoMessage = "Sorry, something went wrong. Please try again.";
						$scope.openEditMyInfoMessage = 1;
					});
				} else {
					alert("You are signed in using the guest account. You cannot change the username.");
					$scope.updatedUserName = "";
					$scope.userNamePW = "";
					$scope.openUserNameEdit = 0;
					$scope.openEditMyInfoMessage = 0;
				}
			} else {
				$scope.editMyInfoMessage = "Please enter your password.";
				$scope.openEditMyInfoMessage = 1;
			}
		}	else if (($scope.updatedUserName == undefined) || ($scope.updatedUserName == "")) {
			$scope.editMyInfoMessage = "Please enter new user name. Or click 'Cancel'.";
			$scope.openEditMyInfoMessage = 1;
		}	else {
			$scope.editMyInfoMessage = "Please try again.";
			$scope.openEditMyInfoMessage = 1;
		}
	};
	$scope.cancelUserName = function() {
		$scope.openUserNameEdit = 0;
		$scope.openEditMyInfoMessage = 0;
	};

// (Email) - - - - - - - - - - - - - - - - - - - - - - -
	$scope.editEmail = function() {
		if ($scope.openEmailEdit == 0) {
			$scope.openEmailEdit = 1;
			$scope.openUserNameEdit = 0;
			$scope.openPWEdit = 0;
			$scope.openAddressEdit = 0;
		} else {
			$scope.openEmailEdit = 0;
		}
	};
	$scope.saveEmail = function() {
		if (($scope.updatedEmail !== undefined) && ($scope.updatedEmail !== "")) {
			if (($scope.emailPW !== undefined) && ($scope.emailPW !== "")) {
				var pw = $scope.emailPW;
				var username = $scope.user.username;

				PWservice.validate(pw, username, 'email', $scope.updatedEmail)
				.then(function success(rspns) {
					if (rspns.data.passFail === 1) {
						$location.path('/signin');
					} else {
						$scope.editMyInfoMessage = "Please re-enter your password.";
						$scope.openEditMyInfoMessage = 1;
					}
				}, function fail(rspns) {
					$scope.editMyInfoMessage = "Sorry, something went wrong. Please try again.";
					$scope.openEditMyInfoMessage = 1;
				});
			} else {
				$scope.editMyInfoMessage = "Please enter your password.";
				$scope.openEditMyInfoMessage = 1;
			}
		}	else if (($scope.updatedEmail == undefined) || ($scope.updatedEmail == "")) {
			$scope.editMyInfoMessage = "Please enter new E-mail address. Or click 'Cancel'.";
			$scope.openEditMyInfoMessage = 1;
		}	else {
			$scope.editMyInfoMessage = "Please try again.";
			$scope.openEditMyInfoMessage = 1;
		}
	};
	$scope.cancelEmail = function() {
		$scope.openEmailEdit = 0;
		$scope.openEditMyInfoMessage = 0;
	};

// (Password) - - - - - - - - - - - - - - - - - - - - - - -
	$scope.editPW = function() {
		if ($scope.openPWEdit == 0) {
			$scope.openPWEdit = 1;
			$scope.openUserNameEdit = 0;
			$scope.openEmailEdit = 0;
			$scope.openAddressEdit = 0;
		} else {
			$scope.openPWEdit = 0;
		}
	};
	$scope.savePW = function() {
		if (($scope.updatedPW !== undefined) && ($scope.updatedPW !== "")) {
			if (($scope.updatedPWConfirm !== undefined) && ($scope.updatedPWConfirm !== "")) {
				if (($scope.pwPW !== undefined) && ($scope.pwPW !== "")) {
					if ($scope.updatedPW === $scope.updatedPWConfirm) {
						var pw = $scope.pwPW;
						var username = $scope.user.username;
						if (username !== "test") {
							PWservice.validate(pw, username, 'password', $scope.updatedPW)
							.then(function success(rspns) {
								if (rspns.data.passFail === 1) {
									$location.path('/signin');
								} else {
									$scope.editMyInfoMessage = "Please re-enter your password.";
									$scope.openEditMyInfoMessage = 1;
								}
							}, function fail(rspns) {
								$scope.editMyInfoMessage = "Sorry, something went wrong. Please try again.";
								$scope.openEditMyInfoMessage = 1;
							});
						} else {
							alert("You are signed in using the guest account. You cannot change the username.");
							$scope.updatedPW = "";
							$scope.updatedPWConfirm = "";
							$scope.pwPW = "";
							$scope.openPWEdit = 0;
							$scope.openEditMyInfoMessage = 0;
						}
					} else {
						$scope.editMyInfoMessage = "Failed to confirm new password. Please try again.";
						$scope.openEditMyInfoMessage = 1;
					}
				} else {
					$scope.editMyInfoMessage = "Please enter your password.";
					$scope.openEditMyInfoMessage = 1;
				}
			} else {
				$scope.editMyInfoMessage = "Please enter new password.";
				$scope.openEditMyInfoMessage = 1;
			}
		}	else if (($scope.updatedPW == undefined) || ($scope.updatedPW == "")) {
			$scope.editMyInfoMessage = "Please enter new password. Or click 'Cancel'.";
			$scope.openEditMyInfoMessage = 1;
		}	else {
			$scope.editMyInfoMessage = "Please try again.";
			$scope.openEditMyInfoMessage = 1;
		}
	};
	
	$scope.cancelPW = function() {
		$scope.openPWEdit = 0;
		$scope.openEditMyInfoMessage = 0;
	};

	$scope.editAddress = function() {
		if ($scope.openAddressEdit == 0) {
			$scope.openAddressEdit = 1;
			$scope.openUserNameEdit = 0;
			$scope.openEmailEdit = 0;
			$scope.openPWEdit = 0;
			var states = document.getElementsByClassName('optionState');
			for (var i = 0; i < states.length; i++) {
				if (states[i].innerHTML == $scope.user.address.state) {
					document.getElementsByClassName('optionState')[i].setAttribute('selected', 'selected');
				}
			}
		} else {
			$scope.openAddressEdit = 0;
		}
	};
	$scope.saveAddress = function() {
		var name;
		var add1;
		var add2;
		var city;
		var state;
		var zip;
		if ($scope.updatedName) {
			name = $scope.updatedName;
		} else {
			name = $scope.user.address.name;
		}
		if ($scope.updatedAdd1) {
			add1 = $scope.updatedAdd1;
		} else {
			add1 = $scope.user.address.line1;
		}
		if ($scope.updatedAdd2) {
			add2 = $scope.updatedAdd2;
		} else {
			add2 = $scope.user.address.line2;
		}
		if ($scope.updatedCity) {
			city = $scope.updatedCity;
		} else {
			city = $scope.user.address.city;
		}
		if ($scope.updatedState) {
			state = $scope.updatedState;
		} else {
			state = $scope.user.address.state;
		}
		if ($scope.updatedZip) {
			zip = $scope.updatedZip;
		} else {
			zip = $scope.user.address.zip;
		}
		var address = {
			name: name,
			line1: add1,
			line2: add2,
			city: city,
			state: state,
			zip: zip
		};
		var username = $scope.user.username;
		var pw = $scope.addressPW;
		if (($scope.addressPW !== undefined) && ($scope.addressPW !== "")) {
			PWservice.validate(pw, username, 'address', address)
			.then(function success(rspns) {
				if (rspns.data.passFail === 1) {
					$location.path('/signin');
				} else {
					$scope.editMyInfoMessage = "Please re-enter your password.";
					$scope.openEditMyInfoMessage = 1;
				}
			}, function fail(rspns) {
				$scope.editMyInfoMessage = "Sorry, something went wrong. Please try again.";
				$scope.openEditMyInfoMessage = 1;
			});
		} else {
			$scope.editMyInfoMessage = "Please enter your password.";
			$scope.openEditMyInfoMessage = 1;
		}
		
	};
	$scope.cancelAddress = function() {
		$scope.openAddressEdit = 0;
		$scope.openEditMyInfoMessage = 0;
	};

// My Plan -----------------------------------------------
	$scope.openPlanEditOptions = function() {
		if ($scope.openInfoEdits == 0) {
			$scope.openInfoEdits = 1;
		} else {
			$scope.openInfoEdits = 0;
		}
	}

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
		} else {
			$location.path('/calculator');
		}
	};
	$scope.saveUpdatedPlan = function() {
		$http.post(url + 'saveMyPlan', {
			plan: planUpdate,
			token: $cookies.get('userToken')
		}).then(function success(rspns) {
			alert("Your plan has been successfully updated.");
			$cookies.putObject('memberPlan', "");
			$scope.openUpdatedPlanInfo = 0;
			$scope.planUpdate = "";
			$route.reload();
			$location.path('/signin');
		}, function fail(rspns) {
			alert("Sorry, try again.");
		});
	};
	$scope.discardUpdatedPlanInfo = function() {
		$cookies.putObject('memberPlan', '');
		$scope.planUpdate = "";
		$scope.openUpdatedPlanInfo = 0;
		$route.reload();
	};

// My Cart -----------------------------------
	$scope.openPencil = 0;
	$scope.qtyEdit = function(that) {
		if (that.openPencil == 1) {
			if ($scope.qtyUpdated === 0) {
				$scope.cartArr.splice(that.$index, 1);
				$scope.qtyUpdated = "";
			}
			that.openPencil = 0;
			saveMyCart();
		} else {
			that.openPencil = 1;
		}	
	};
	$scope.updated = function(that) {
		var index = that.$index;
		$scope.cartArr[index].cart.qty = $scope.qtyUpdated;
		var itemTotalUpdated = $scope.cartArr[index].cart.qty * $scope.cartArr[index].price;
		$scope.cartArr[index].cart.total = itemTotalUpdated.toFixed(2);
		updateCart();
	};

	$scope.removeAll = function() {
		$scope.cartArr = [];
		$scope.cartTotal = "";
		$scope.cartTotalItems = "";
		$scope.currentOz = "";
		updateCart();
		saveMyCart();
	};

	$scope.checkOut = function() {
		var desc = $rootScope.userData.username + '\'s cart';
		var userEmail = $rootScope.userData.email;
		// if ($rootScope.userData.stripe.length > 0) {
			var handler = StripeCheckout.configure({
				key: 'pk_test_542jVkNp2tVTQmzjscWkHT7u',
				image: null,
				locale: 'auto',
				token: function(token) {
					$http.post(url + 'stripe', {
						amount: $scope.cartTotal * 100,
						stripeToken: token.id,
						description: desc
					}).then(function success(rspns) {
						if (rspns.data.passFail == 1) {
							console.log(rspns.obj);
							console.log("Payment successful");
							//Thank you user and redirect page
							// var charge = rspns.obj;
							var charge = {
								random: 'test'
							};
							var cart = $rootScope.userData.cart;
							$cookies.putObject('charge', charge);
							$cookies.putObject('cartPurchased', cart);
							console.log($cookies.getObject('cartPurchased'));
							$location.path('/checkout');
						} else {
							console.log(rspns.obj);
							console.log("Payment failed");
							//test-------remove later
							// var charge = rspns.obj;
							var charge = {
								random: 'test'
							};
							var cart = $rootScope.userData.cart;
							$cookies.putObject('charge', charge);
							$cookies.putObject('cartPurchased', cart);
							console.log($cookies.getObject('cartPurchased'));
							$location.path('/checkout');
						}
					}, function fail(rspns) {
						console.log("Connection to payment failed");
						console.log(rspns.obj);
					});
				}
			});
			handler.open({
				name: "HydroSource",
				amount: $scope.cartTotal * 100,
				description: desc
			});
		// } else {
		// 	var handler = StripeCheckout.configure({
		// 		key: 'pk_test_542jVkNp2tVTQmzjscWkHT7u',
		// 		image: null,
		// 		locale: 'auto',
		// 		token: function(token) {
		// 			console.log("Token ID: " + token.id);
		// 			$http.post(url + 'firstStripe', {
		// 				amount: $scope.cartTotal * 100,
		// 				stripeToken: token.id,
		// 				description: userEmail
		// 			}).then(function success(rspns) {
		// 				if (rspns.data.passFail == 1) {
		// 					console.log(rspns.obj);
		// 					console.log("(firstStripe) Payment successful");
		// 					//direct to confirmation page
		// 					$cookies.putObject('charge');
		// 					$cookies.putObject('cartPurchased')
		// 					$location.path('/checkout');
		// 				} else {
		// 					console.log(rspns.obj);
		// 					console.log("(firstStripe) Payment failed");
		// 				}
		// 			}, function fail(rspns) {
		// 				console.log("(firstStripe) Connection to payment failed");
		// 				console.log(rspns.obj);
		// 			});
		// 		}
		// 	});
		// 	handler.open({
		// 		name: "HydroSource",
		// 		amount: $scope.cartTotal * 100,
		// 		description: desc,
		// 		shippingAddress: true,
		// 		billingAddress: true
		// 	});
		// }	
	};
	function saveMyCart() {
		var userToken = $cookies.get('userToken');
		var cartToSave = {
			items: $scope.cartArr,
			qty: $scope.cartTotalItems,
			total: $scope.cartTotal,
			oz: $scope.currentOz
		};
		$http.post(url + 'saveCart', {
			cart: cartToSave,
			token: userToken
		}).then(function success(rspns) {
			$scope.saved = 1;
		}, function fail(rspns) {
			$scope.notSaved = 1;
		});
	};

	function updateCart() {
		var total = 0;
		$scope.cartTotal = $scope.cartArr.reduce(function(total, item) {
			total += Number(item.cart.total);
			return total;
		}, total);
		$scope.cartTotal = Math.round($scope.cartTotal * 1e2) / 1e2;
		var total1 = 0;
		$scope.cartTotalItems = $scope.cartArr.reduce(function(total1, item) {
			total1 += Number(item.cart.qty);
			return total1;
		}, total1)
		var total2 = 0;
		$scope.currentOz = $scope.cartArr.reduce(function(total2, item) {
			total2 += item.package.qty * item.oz * item.cart.qty;
			return Math.round(total2);
		}, total2);
		if ($scope.cartArr.length > 0) {
			$scope.cartReady = 1;
		} else {
			$scope.cartReady = 0;
		}
	}
});