shopApp.controller('modalCtrl', function($modalInstance) {
	var vm = this;
	vm.close = function() {
		$modalInstance.close();
	};
});