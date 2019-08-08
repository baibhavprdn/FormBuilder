// function openDatabase() {
// 	function successcb() {
// 		console.log('Database opened successfully');
// 	}

// 	function errorcb(error) {
// 		console.log('failed to open databae' + JSON.stringify(error));
// 	}

// 	var dbObj = window.sqlitePlugin.openDatabase({
// 		name: 'formDb.db',
// 		location: 'default'
// 	}, successcb, errorcb);
// 	dbObj.transaction(function (tx) {
// 		tx.executeSql('CREATE TABLE IF NOT EXISTS controlDefinitions (Name text primary key, Type text)', [], function () {
// 			console.log('Table created successfully');
// 		}, function (error) {
// 			console.log('Failed to create table', JSON.stringify(error));
// 		});
// 	});
// 	return dbObj;
// }

// function insertToDb(ctrlName, ctrlType, dbObj, cb) {
// 	dbObj.transaction(function (tx) {
// 		tx.executeSql('INSERT INTO controlDefinitions VALUES (?1,?2)', [ctrlName, ctrlType]);
// 	}, function (error) {
// 		console.log('Transaction error:' + error.message);
// 	}, function () {
// 		console.log('Populated Database OK');
// 		window.plugins.toast.show('Added to database successfully', 'short', 'bottom', function (a) {
// 			console.log('toast success: ' + a);
// 		}, function (b) {
// 			alert('toast error: ' + b);
// 		});
// 		cb();
// 	});
// }

// function readDb(dbObj, getArray) {
// 	dbObj.transaction(function (tx) {
// 		tx.executeSql('SELECT * FROM controlDefinitions', [], function (tx, results) {
// 			getArray(results.rows);
// 		}, function (error) {
// 			console.log('Transaction error:' + error.message);
// 		});
// 	});
// }

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

