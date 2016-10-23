shopApp.controller('cartCtrl', function($scope, $rootScope, $cookies, $http, $location) {
	$scope.saved = 0;
	$scope.notSaved = 0;

	var jsonCart;
	if ($cookies.getObject('cart')) {
		if ($cookies.getObject('cart').items.length > 0) {
			jsonCart = $cookies.getObject('cart');
			$scope.cartArr = jsonCart.items;
			$scope.cartTotal = jsonCart.total;
			$scope.cartTotalItems = jsonCart.qty;
			$scope.currentOz = jsonCart.oz;
			$scope.cartReady = 1;
		} else {
			$scope.cartArr = [];
			$scope.cartTotal = 0;
			$scope.cartTotalItems = 0;
			$scope.currentOz = 0;
			$scope.cartReady = 0;
		}
	} else {
		$scope.cartArr = [];
		$scope.cartTotal = 0;
		$scope.cartTotalItems = 0;
		$scope.currentOz = 0;
		$scope.cartReady = 0;
	}

	$scope.openPencil = 0;
	$scope.qtyEdit = function(that) {
		that.openPencil = !that.openPencil;
		if ($scope.qtyUpdated === 0) {
			$scope.cartArr.splice(that.$index, 1);
		}
		updateCart();
		$scope.qtyUpdated = "";
	};
	$scope.updated = function(that) {
		var index = that.$index;
		$scope.cartArr[index].cart.qty = $scope.qtyUpdated;
		var itemTotalUpdated = $scope.cartArr[index].cart.qty * $scope.cartArr[index].price;
		$scope.cartArr[index].cart.total = itemTotalUpdated.toFixed(2);
		updateCart();
	};

	//buttons below the cart
	$scope.resetCart = function() {
		$scope.cartArr = [];
		updateCart();
	};
	$scope.goToStore = function() {
		$location.path('/store');
	}
	$scope.checkOut = function() {
		var desc = $rootScope.userData.username + '\'s cart';
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
						//Thank you user and redirect page
					} else {
					}
				}, function fail(rspns) {
				})
			}
		});
		handler.open({
			name: "HydroSource",
			amount: $scope.cartTotal * 100,
			description: desc,
			shippingAddress: true,
			billingAddress: true
		});
	}

	$scope.saveMyCart = function() {
		var userToken = $cookies.get('userToken');
		var cartToSave = {
			items: $scope.cartArr,
			qty: $scope.cartTotalItems,
			total: $scope.cartTotal,
			oz: $scope.currentOz
		};
		if (cartToSave.items.length > 0) {
			var now = Date.now();
			$http.post(url + 'saveCart', {
				cart: cartToSave,
				token: userToken
			}).then(function success(rspns) {
				$scope.saved = 1;
				$scope.cartArr = [];
				$scope.cartTotal = 0;
				$scope.cartTotalItems = 0;
				$scope.currentOz = 0;
				$scope.cartReady = 0;
				$cookies.putObject('cart', "");
			}, function fail(rspns) {
				$scope.notSaved = 1;
			});
		} 
	};

	$scope.goToAccount = function() {
		$location.path('/account');
	}
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
		var jsonCartArr = {
			items: $scope.cartArr,
			total: $scope.cartTotal,
			qty: $scope.cartTotalItems,
			oz: $scope.currentOz
		};
		$cookies.putObject('cart', jsonCartArr);
	}

});