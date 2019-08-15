formbuilder.controller('ViewerCtrl', ['$scope', 'dbservice', '$state', '$stateParams', function ($scope, dbservice, $state, $stateParams) {
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

		//force change in view if scope changes
		$scope.$apply(function () {
			$scope.generateViewBuilder = true;
			$scope.dbData = dbDataArray;
			if ($stateParams.show == false) {
				$scope.generateViewBuilder = false;
			}
		});
		console.log($scope.dbData);
		initializeSelect();
	};

	$scope.submitForm = function () {
		console.log('form submitted');
	};

	dbservice.readDb(dbObj, getArray);
	var selectOptions = document.querySelectorAll('.formviewer-select');
	selectOptions.forEach(function (element) {
		console.log('select option active, modal opened');
	});
	selectOptions.forEach(function (element) {
		element.addEventListener('click', function () {
			console.log('select element clicked; open modal');
		});
	});
}]);