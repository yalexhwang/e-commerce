shopApp.controller('storeCtrl', function($scope, $cookies, $http, userDataFactory) {
	$scope.goal = $cookies.get('intake');
	console.log($scope.intake);
	$scope.current = 0; 

	$scope.cartItems = 0;
	$scope.cartTotal = 0;
	$scope.cartArr = [];
	$scope.products = [];
	$scope.totalAmount = 0;

	$scope.removeItem = function(index) {
		console.log($scope.products[index]);
		var item = $scope.products[index];
		if (item.counter > 0) {
			item.counter -= 1;
		}
		$scope.cartArr.splice(index, 1);
		var total = 0;
		$scope.totalAmount = $scope.cartArr.reduce(function(total, item) {
			total += item.price;
			return total;
		}, total);
		$scope.totalAmount = $scope.totalAmount.toFixed(2);
		console.log($scope.cartArr);
	};
	
	$scope.addItem = function(index) {
		console.log($scope.products[index]);
		var item = $scope.products[index];
		item.counter += 1;
		$scope.cartArr.push(item);
		var total = 0;
		$scope.totalAmount = $scope.cartArr.reduce(function(total, item) {
			total += item.price;
			return total;
		}, total);
		$scope.totalAmount = $scope.totalAmount.toFixed(2);
		console.log($scope.cartArr);
	};

	var url = "http://localhost:3000/products"
	$http.post(url).then(function success(rspns) {
		console.log(rspns);
		var all = rspns.data.obj;
		for (var i = 0; i < 12; i++) {
			all[i].counter = 0;
			$scope.products.push(all[i]);
		}
		console.log($scope.products);
	}, function fail(rspns) {
		console.log(rspns);
	});


});