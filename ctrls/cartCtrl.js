shopApp.controller('cartCtrl', function($scope, $cookies, $http, $location, logInStatus) {
	//cookies set for cartTotal and cartArr
	var jsonCartArr = $cookies.getObject('cart');
	console.log(jsonCartArr);
	if (jsonCartArr) {
		$scope.cartArr = jsonCartArr.cart;
		updateCart();
	} else {
		$scope.cartArr = [];
		$scope.cartTotal = 0;
	}

	$scope.loggedIn = 0;
	var logIn = logInStatus.getStatus();
	console.log(logIn);
	if (logIn) {
		$scope.loggedIn = 1;
	} else {
		$scope.loggedIn = 0;
	}

	$scope.goToStore = function() {
		$location.path('/store');
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
		$scope.cartArr[index].cart.total = $scope.cartArr[index].cart.qty * $scope.cartArr[index].price;
		$scope.cartArr[index].cart.total =	$scope.cartArr[index].cart.total.toFixed(2);
	}

	$scope.resetCart = function() {
		$scope.cartArr = [];
		updateCart();
	};
	
	$scope.checkOut = function() {
		if ($scope.loggedIn) {
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
		} else {
			$location.path('/register');
		}
	}

	$scope.saveMyCart = function() {
		var userToken = $cookies.getObject('userToken');
		var currentCart = $scope.cartArr;
		var now = Date.now();
		$http.post(url + 'save-my-cart', {
			cart: {
				cart: currentCart,
				createdAt: now,
			},
			token: userToken.token
		}).then(function success(rspns) {
			console.log("Cart saved");
			console.log(rspns);
			$scope.saved = 1;
		}, function fail(rspns) {
			console.log("Cart not saved");
			console.log(rspns);
		});
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
		console.log($scope.cartArr);
		var jsonCartArr = {
			cart: $scope.cartArr
		};
		$cookies.putObject('cart',jsonCartArr);
	}

});