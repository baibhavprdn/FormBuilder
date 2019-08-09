formbuilder.controller('BuilderCtrl', ['$scope', 'dbservice', function ($scope, dbservice) {

	var mainDb = 'formDb.db';
	var selectDb = 'selectDb.db';
	var dialog = document.querySelector('dialog');
	dialog.querySelector('.close').addEventListener('click', function () {
		dialog.close();
	});

	var dbObj = dbservice.openDatabase(mainDb);
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
		$scope.dbData = dbDataArray;
		console.log($scope.dbData);
	};

	var getSelectArray = function (resultsrows) {
		dbSelectArray = [];
		var length = resultsrows.length;

	};

	dbservice.readDb(dbObj, getArray);

	$scope.submitToFormView = function () {
		if ($scope.data.singleSelect == 'select') {
			document.getElementById('add-select-options').showModal();
		}
		// dbservice.insertToDb($scope.data.ctrlName, $scope.data.singleSelect, dbObj, function () {
		// 	dbservice.readDb(dbObj, getArray);
		// });
		else {
			dbservice.insertToDb($scope.data.ctrlName, $scope.data.singleSelect, 'controlDefinitions', dbObj, function () {
				dbservice.readDb(dbObj, getArray);
			});
		}
	};

	$scope.addSelectOptions = function () {
		console.log('add new table here for select options');
		$scope.newOptions.push($scope.data.newSelect);
	};

	$scope.saveSelectOptions = function () {
		console.log('select table saved');
		// selectObj = dbservice.openDatabase(selectDb);
		// dbservice.readDb(selectObj, getSelectArray);
	};

	$scope.cancelSelectOptions = function () {
		$scope.newOptions = [];
	};
}]);

