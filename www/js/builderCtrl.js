formbuilder.controller('BuilderCtrl', ['$scope', 'dbservice', function ($scope, dbservice) {

	var dbObj = dbservice.openDatabase();
	// dbservice.openDatabase();
	var dbDataArray = [];
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

	dbservice.readDb(dbObj, getArray);

	$scope.submitToFormView = function () {
		dbservice.insertToDb($scope.ctrlName, $scope.data.singleSelect, dbObj, function () {
			dbservice.readDb(dbObj, getArray);
		});
	};
}]);

