shopApp.controller('cartCtrl', function($scope, $rootScope, $cookies, $http, $location) {
	var jsonCart;
	if ($cookies.getObject('cart') && ($cookies.getObject('cart') !== undefined)) {
		jsonCart = $cookies.getObject('cart');
		console.log("cart found from $coookies");
		console.log(jsonCart);
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

	$scope.openPencil = 0;
	$scope.qtyEdit = function(that) {
		that.openPencil = !that.openPencil;
		console.log("final " + $scope.qtyUpdated);
		if ($scope.qtyUpdated === 0) {
			$scope.cartArr.splice(that.$index);
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
		var handler = StripeCheckout.configure({
			key: 'pk_test_542jVkNp2tVTQmzjscWkHT7u',
			image: null,
			locale: 'auto',
			token: function(token) {
				console.log("Token ID: " + token.id);
				$http.post('http://localhost:3000/stripe', {
					amount: $scope.cartTotal * 100,
					stripeToken: token.id,
					token: $cookies.get('token')
				}).then(function success(rspns) {
					if (rspns.data.passFail) {
						console.log(rspns);
						console.log("Payment successful");
						//Thank you user and redirect page
					} else {
						console.log(rspns.obj);
						console.log("Payment failed");
					}
				}, function fail(rspns) {
					console.log("Connection to payment failed");
					console.log(rspns.obj);
				})
			}
		});
		handler.open({
			name: "HydroSource",
			amount: $scope.cartTotal * 100,
			description: "$scope.memberName's cart"
		});
	}

	$scope.saveMyCart = function() {
		updateCart();
		var userToken = $cookies.getObject('userToken');
		var cartToSave = {
			items: $scope.cartArr,
			qty: $scope.cartTotalItems,
			total: $scope.cartTotal
		};
		console.log(cartToSave);
		if (cartToSave.cart.length > 0) {
			var now = Date.now();
			$http.post(url + 'saveCart', {
				cart: cartToSave,
				token: userToken.token
			}).then(function success(rspns) {
				console.log("Cart saved");
				console.log(rspns);
				$scope.saved = 1;
				$cookies.putObject('cart', '');
			}, function fail(rspns) {
				console.log("Cart not saved");
				console.log(rspns);
			});
		} 
	};

	function updateCart() {
		var total = 0;
		$scope.cartTotal = $scope.cartArr.reduce(function(total, item) {
			total += Number(item.cart.total);
			return total;
		}, total);
		$scope.cartTotal = $scope.cartTotal.toFixed(2);
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
		console.log($scope.cartArr);
		var jsonCartArr = {
			cart: $scope.cartArr,
			total: $scope.cartTotal,
			qty: $scope.cartTotalItems,
			oz: $scope.currentOz
		};
		$cookies.putObject('cart',jsonCartArr);
	}

});