shopApp.controller('storeCtrl', function($scope, $cookies, $http) {
	var supplyOz = $cookies.get('totalSupply');
	console.log(supplyOz);
	$scope.currentOz = 0;
	function currentOz() {
		var returnCurrentOz = function() {
			var total = 0;
			var currentTotal = $scope.cartArr.reduce(function(total, item) {
				total += item.package.qty * item.oz;
				return total;
			}, total)
			return currentOz();
		}
		$scope.currentOz = returnCurrentOz;
	}

	if (supplyOz) {
		$scope.totalSupply = supplyOz;
		$scope.body1 = 1;
		$scope.body2 = 0;
	} else {
		$scope.body1 = 0;
		$scope.body2 = 1;
	}
	
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

	$scope.products = [];
	$http.post(url + 'products').then(function success(rspns) {
		var all = rspns.data.obj;
		for (var i = 0; i < 12; i++) {
			all[i].cart = {
				qty: 0,
				total: 0
			};
			all[i].productImg = all[i].img[0];
			$scope.products.push(all[i]);
		}
		console.log($scope.products);
	}, function fail(rspns) {
		console.log(rspns);
	});	
	
	$scope.removeItem = function(index) {
		var item = $scope.products[index];
		if (item.cart.qty === 0) {
			return false;
		}
		console.log(item);
		var matchingIndex;
		if ($scope.cartArr.length > 0) {
			for (var i = 0; i < $scope.cartArr.length; i++) {
				if (item._id == $scope.cartArr[i]._id) {
					matchingIndex = i;
				} 
			}
			item.cart.qty -= 1;
			item.cart.total = (item.price * item.cart.qty).toFixed(2);
			if (item.cart.qty === 0) {
				$scope.cartArr.splice(matchingIndex, 1);
			}
		}  
		updateCart();
	};
	
	$scope.addItem = function(index) {
		var item = $scope.products[index];
		var matchFound;
		var matchIndex;
		for (var i = 0; i < $scope.cartArr.length; i++) {
			if (item._id === $scope.cartArr[i]._id) {
				matchFound = 1;
				matchIndex = i;
			}
		}
		if (matchFound) {
			var match = $scope.cartArr[matchIndex];
			match.cart.qty += 1;
			match.cart.total = (match.cart.qty * match.price).toFixed(2);
		} else {
			item.cart.qty += 1;
			item.cart.total = (item.cart.qty * item.price).toFixed(2);
			$scope.cartArr.push(item);
		}
		updateCart();
	};

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