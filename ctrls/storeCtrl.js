shopApp.controller('storeCtrl', function($scope, $rootScope, $cookies, $http, $location) {
	//Water Goal, if cart is not found
	// var supplyOz = $cookies.get('totalSupply');
	// console.log(supplyOz);
	// $scope.currentOz = 0;
	// function currentOz() {
	// 	var returnCurrentOz = function() {
	// 		var total = 0;
	// 		var currentTotal = $scope.cartArr.reduce(function(total, item) {
	// 			total += item.package.qty * item.oz;
	// 			return total;
	// 		}, total)
	// 		return currentOz();
	// 	}
	// 	$scope.currentOz = returnCurrentOz;
	// }

	//how to set water goal?
	//if cart found from user's db (my cart)
	//if cart found from cookies (not in db), then get Oz from cookies as well
	
	// if (supplyOz) {
	// 	$scope.totalSupply = supplyOz;
	// 	$scope.body1 = 1;
	// 	$scope.body2 = 0;
	// } else {
	// 	$scope.body1 = 0;
	// 	$scope.body2 = 1;
	// }

	//Store--------------------------------------
	
	//cookies set for cartTotal, cartTotalItems and cartArr
	var jsonCart = $cookies.getObject('cart');
	console.log('jsonCart from $cookies retrieved:');
	console.log(jsonCart);
	if ((jsonCart) && (jsonCart !== undefined)) {
		$scope.cartArr = jsonCart.items;
		$scope.cartTotal = jsonCart.total;
		$scope.cartTotalItems = jsonCart.qty;
		$scope.currentOz = jsonCart.oz;
		console.log($scope.cartArr);
		updateCart();
	} else {
		console.log('jsonCart is undefined');
		$scope.cartArr = [];
		$scope.cartTotal = 0;
		$scope.cartTotalItems = 0;
		$scope.currentOz = 0;

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

	function updateCart() {
		console.log($scope.cartArr);
		if ($scope.cartArr.length < 0) {
			$cookies.putObject('cart', '');
		} else {
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
			console.log($scope.cartArr);
			var tempCart = {
				items: $scope.cartArr,
				qty: $scope.cartTotalItems,
				total: $scope.cartTotal,
				oz: $scope.currentOz
			};
			$cookies.putObject('cart', tempCart);
		}
	}
		
});