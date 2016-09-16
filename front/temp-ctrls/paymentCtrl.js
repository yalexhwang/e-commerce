shopApp.controller('paymentCtrl', function($scope, $http, $cookies, $location) {
	$scope.test = "works?";

	$scope.payOrder = function(userOptons) {
		console.log('pay!');
		var handler = StripeCheckout.configure({
				key: 'pk_test_542jVkNp2tVTQmzjscWkHT7u',
				image: null,
				locale: 'auto',
				token: function(token) {
					console.log("The token ID is: " + token.id);
					
					$http.post('http://localhost:3000/checkout', {
						amount: $scope.total * 100,
						stripeToken: token.id, 
						token: $cookies.get('token')
					}).then(function sucess(rspns) {
						if (rspns.data.passFail) {
							console.log(rspns);
							console.log("Paid");
							//Thank you!
						} else {
							console.log(rspns.obj);
							console.log("Payment failed.");
						}
					}, function fail(rspns) {
						console.log(rspns.obj);
					});

				}
		});
		handler.open({
			name: $scope.name,
			amount: $scope.total * 100,
			description: "blah blah"
		});
	}
	
});

// sk_test_rVxj53YFntTdQUvYi6SWdVcC
// pk_test_542jVkNp2tVTQmzjscWkHT7u

// sk_live_GlCpG6hbi1Ty3zBAeXn9JmpL
// pk_live_OmFeK4Vj1hc7th4qWOBoaKUs