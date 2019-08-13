formbuilder.controller('BuilderCtrl', ['$scope', 'dbservice', function ($scope, dbservice) {

	var mainTable = 'controlDefinitions';
	var dialog = document.querySelector('dialog');
	dialog.querySelector('.close').addEventListener('click', function () {
		dialog.close();
	});

	var dbObj = dbservice.openDatabase(mainTable);
	var dbDataArray = [];
	$scope.isSelect = false;
	$scope.newOptions = [];

	//callback after read operation
	var getArray = function (resultsrows) {
		dbDataArray = [];
		var length = resultsrows.length;
		var i = 0;
		for (i; i < length; i++) {
			dbDataArray.push(resultsrows.item(i));
		}

		dbDataArray.forEach(function (element) {
			if (element.Type == "select") {
				element.SelectValues = element.SelectValues.split(',');
			}
		});
		$scope.dbData = dbDataArray;
		console.log($scope.dbData);
		$scope.generateViewBuilder = true;
		initializeSelect();
	};

	dbservice.readDb(dbObj, getArray);

	$scope.submitToFormView = function () {
		if ($scope.data.singleSelect == 'select') {
			document.getElementById('add-select-options').showModal();
		}
		else {
			dbservice.insertToDb($scope.data.ctrlName, $scope.data.singleSelect, null, mainTable, dbObj, function () {
				dbservice.readDb(dbObj, getArray);
				initializeSelect();
			});
		}
	};

	$scope.addSelectOptions = function () {
		$scope.newOptions.push($scope.data.newSelect);
	};

	$scope.saveSelectOptions = function () {
		var selectString = $scope.newOptions.join();
		dbservice.insertToDb($scope.data.ctrlName, $scope.data.singleSelect, selectString, mainTable, dbObj, function () {
			dbservice.readDb(dbObj, getArray);
			// initializeSelect();
		});

		$scope.newOptions = [];
	};

	$scope.cancelSelectOptions = function () {
		$scope.newOptions = [];
		document.querySelector('dialog').close();
	};

	$scope.clearDatabase = function () {
		dbservice.clearDatabase(dbObj);
		dbservice.openDatabase(dbObj);
		$scope.dbData = [];
		$scope.generateViewBuilder = false;
	};

	$scope.submitForm = function () {
		console.log('form submitted');
	};
}]);

