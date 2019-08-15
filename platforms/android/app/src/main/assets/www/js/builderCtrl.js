formbuilder.controller('BuilderCtrl', ['$scope', 'dbservice', '$state', function ($scope, dbservice, $state) {

	var mainTable = 'controlDefinitions';
	var dialog = document.querySelector('dialog');
	dialog.querySelector('.close').addEventListener('click', function () {
		dialog.close();
	});

	var dbObj = dbservice.openDatabase(mainTable);
	var dbDataArray = [];
	$scope.newOptions = [];

	//callback after read operation
	// var getArray = function (resultsrows) {
	// 	dbDataArray = [];
	// 	var length = resultsrows.length;
	// 	var i = 0;
	// 	for (i; i < length; i++) {
	// 		dbDataArray.push(resultsrows.item(i));
	// 	}

	// 	dbDataArray.forEach(function (element) {
	// 		if (element.Type == "select") {
	// 			element.SelectValues = element.SelectValues.split(',');
	// 		}
	// 	});

	// 	//manually update view after changes in $scope
	// 	$scope.$apply(function () {
	// 		$scope.generateViewBuilder = true;
	// 		$scope.dbData = dbDataArray;
	// 	});
	// 	console.log($scope.dbData);
	// 	initializeSelect();
	// };

	// dbservice.readDb(dbObj, getArray);

	$scope.submitToFormView = function () {
		if ($scope.data.singleSelect == 'select') {
			document.getElementById('add-select-options').showModal();
		}
		else {
			dbservice.insertToDb($scope.data.ctrlName, $scope.data.singleSelect, null, mainTable, dbObj, function () {
				// dbservice.readDb(dbObj, getArray);
				initializeSelect();
				$state.go('home.formviewer', { 'show': true }, { reload: true });
				// $state.reload();
			});
		}
	};

	$scope.addSelectOptions = function () {
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
	}

	$scope.clearDatabase = function () {
		dbservice.clearDatabase(dbObj);
		dbservice.openDatabase(dbObj);
		$scope.dbData = [];

		var stateParams = {
			'show': false
		};

		$state.go('home.formviewer', stateParams, { reload: true });
	};

	$scope.submitForm = function () {
		console.log('form submitted');
	};
}]);

