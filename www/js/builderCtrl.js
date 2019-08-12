formbuilder.controller('BuilderCtrl', ['$scope', 'dbservice', function ($scope, dbservice) {

	var mainTable = 'controlDefinitions';
	// var selectTable = 'selectDefinitions';
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
	};

	dbservice.readDb(dbObj, getArray);

	$scope.submitToFormView = function () {
		if ($scope.data.singleSelect == 'select') {
			document.getElementById('add-select-options').showModal();
		}
		else {
			dbservice.insertToDb($scope.data.ctrlName, $scope.data.singleSelect, null, mainTable, dbObj, function () {
				dbservice.readDb(dbObj, getArray);
			});
			var elems = document.querySelectorAll('select');
			var instances = M.FormSelect.init(elems);
		}
	};

	$scope.addSelectOptions = function () {
		console.log('add new table here for select options');
		$scope.newOptions.push($scope.data.newSelect);
	};

	$scope.saveSelectOptions = function () {
		var selectString = $scope.newOptions.join();
		dbservice.insertToDb($scope.data.ctrlName, $scope.data.singleSelect, selectString, mainTable, dbObj, function () {
			dbservice.readDb(dbObj, getSelectArray);
		});

		$scope.newOptions = [];
	};

	$scope.cancelSelectOptions = function () {
		$scope.newOptions = [];
		document.querySelector('dialog').close();
	};
}]);

