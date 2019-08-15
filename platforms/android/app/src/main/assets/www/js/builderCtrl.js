formbuilder.controller('BuilderCtrl', ['$scope', 'dbservice', '$state', function ($scope, dbservice, $state) {

	var mainTable = 'controlDefinitions';
	var dialog = document.querySelector('dialog');
	dialog.querySelector('.close').addEventListener('click', function () {
		dialog.close();
	});

	var dbObj = dbservice.openDatabase(mainTable);
	var dbDataArray = [];
	$scope.newOptions = [];
	$scope.selectoptionsExist = false;

	$scope.submitToFormView = function () {
		if ($scope.data.singleSelect == null) {
			window.plugins.toast.show('Please choose Controller Type', 'short', 'bottom', function (a) {
				console.log('toast success: ' + a);
			}, function (b) {
				console.log('toast error: ' + b);
			});
		} else {
			if ($scope.data.singleSelect == 'select') {
				document.getElementById('add-select-options').showModal();
			}
			else {
				dbservice.insertToDb($scope.data.ctrlName, $scope.data.singleSelect, null, mainTable, dbObj, function () {
					initializeSelect();
					$state.go('home.formviewer', { 'show': true }, { reload: true });
				});
			}
		}
	};

	$scope.addSelectOptions = function () {
		$scope.selectoptionsExist = true;
		if ($scope.newOptions == undefined || $scope.newOptions.length == 0) {
			$scope.newOptions.push($scope.data.newSelect);
		}
		else {
			var isUnique = true;
			$scope.newOptions.forEach(function (element) {
				if (element == $scope.data.newSelect) {
					isUnique = false;
				}
			});
			if (isUnique) {
				$scope.newOptions.push($scope.data.newSelect);
			}
			else {
				window.plugins.toast.show('Select option already exists', 'short', 'bottom', function (a) {
					console.log('toast success: ' + a);
				}, function (b) {
					alert('toast error: ' + b);
				});
			}
		}
	};

	$scope.saveSelectOptions = function () {
		var selectString = $scope.newOptions.join();
		dbservice.insertToDb($scope.data.ctrlName, $scope.data.singleSelect, selectString, mainTable, dbObj, function () {
			$state.go('home.formviewer', { 'show': true }, { reload: true });
			// $state.reload();
		});

		$scope.newOptions = [];
	};

	$scope.cancelSelectOptions = function () {
		$scope.newOptions = [];
		document.querySelector('dialog').close();
	};

	$scope.hideViewBuilder = function () {
		$state.go('home.formviewer', { 'show': false }, { reload: true });
	};

	$scope.clearDatabase = function () {
		dbservice.clearDatabase(dbObj);
		dbservice.openDatabase(dbObj);
		$scope.dbData = [];

		var stateParams = {
			'show': false
		};

		$state.go('home.formviewer', stateParams, { reload: true });
	};

}]);

