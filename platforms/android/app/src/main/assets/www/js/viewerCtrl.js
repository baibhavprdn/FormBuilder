formbuilder.controller('ViewerCtrl', ['$scope', 'dbservice', function ($scope, dbservice) {
	console.log('entered viewctrl');

	var mainTable = 'controlDefinitions';
	var dbDataArray = [];
	var dbObj = dbservice.openDatabase(mainTable);
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
		$scope.$apply(function () {
			$scope.generateViewBuilder = true;
			$scope.dbData = dbDataArray;
		});
		console.log($scope.dbData);
		initializeSelect();
	};

	dbservice.readDb(dbObj, getArray);
}]);