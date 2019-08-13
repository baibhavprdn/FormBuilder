formbuilder.service('dbservice', [function () {
	this.openDatabase = function (tableName) {
		function successcb() {
			console.log('Database opened successfully');
		}

		function errorcb(error) {
			console.log('failed to open databae' + JSON.stringify(error));
		}

		var dbObj = window.sqlitePlugin.openDatabase({
			name: 'formDb.db',
			location: 'default'
		}, successcb, errorcb);
		dbObj.transaction(function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS controlDefinitions (Name TEXT PRIMARY KEY, Type TEXT,SelectValues TEXT)', function (error) {
				console.log('Failed to create table', JSON.stringify(error));
			}, function () {
				console.log('Table created successfully');
			});
		});
		return dbObj;
	};

	this.readDb = function (dbObj, getArray) {
		dbObj.transaction(function (tx) {
			tx.executeSql('SELECT * FROM controlDefinitions', [], function (tx, results) {
				getArray(results.rows);
			}, function (error) {
				console.log('Transaction error:' + error.message);
			});
		});
	};

	this.insertToDb = function (value1, value2, value3, tableName, dbObj, cb) {

		dbObj.transaction(function (tx) {
			tx.executeSql('INSERT INTO controlDefinitions VALUES (?1,?2,?3)', [value1, value2, value3]);
		}, function (error) {
			console.log('Transaction error:' + error.message);
		}, function () {
			console.log('Populated Database OK');
			window.plugins.toast.show('Added to database successfully', 'short', 'bottom', function (a) {
				console.log('toast success: ' + a);
			}, function (b) {
				alert('toast error: ' + b);
			});
			cb();
		});
	};

	this.clearDatabase = function (dbObj, cb) {
		dbObj.transaction(function (tx) {
			var queryDropTable = 'DROP TABLE IF EXISTS controlDefinitions';
			tx.executeSql(queryDropTable, [], function (tx, res) {
				console.log('Database deleted successfully');
				window.plugins.toast.show('Database Deleted', 'short', 'bottom', function (a) {
					console.log('toast success: ' + a);
				}, function (b) {
					alert('toast error: ' + b);
				});
			}, function (tx, error) {
				console.log('DELETE error:' + error.message);
			});
		});
	};
}]);