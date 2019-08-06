function onDeviceReady() {
   console.log('cordova ready');
   angular.bootstrap(document.body, ['formbuilder']);
}

function configRoutes($stateProvider, $urlRouterProvider) {
   $stateProvider
      .state('formbuilder', {
         url: '/formbuilder',
         templateUrl: 'views/formbuilder.html',
         controller: 'BuilderCtrl'
      })
      .state('formviewer', {
         url: '/formviewer',
         templateUrl: 'views/formviewer.html',
         controller: 'BuilderCtrl'
      });
   $urlRouterProvider.otherwise('/formbuilder');
}

function openDatabase() {
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
      tx.executeSql('CREATE TABLE IF NOT EXISTS controlDefinitions (Name text primary key, Type text)', [], function () {
         console.log('Table created successfully');
      }, function (error) {
         console.log('Failed to create table', JSON.stringify(error));
      });
   });
   return dbObj;
}

function insertToDb(ctrlName, ctrlType, dbObj) {
   dbObj.transaction(function (tx) {
      tx.executeSql('INSERT INTO controlDefinitions VALUES (?1,?2)', [ctrlName, ctrlType]);
   }, function (error) {
      console.log('Transaction error:' + error.message);
   }, function () {
      console.log('Populated Database OK');
      window.plugins.toast.show('Added to database successfully', 'short', 'bottom', function (a) {
         console.log('toast success: ' + a);
      }, function (b) {
         alert('toast error: ' + b);
      });
   });
}

function readDb(dbObj, getArray) {
   dbObj.transaction(function (tx) {
      tx.executeSql('SELECT * FROM controlDefinitions', [], function (tx, results) {
         getArray(results.rows);
      }, function (error) {
         console.log('Transaction error:' + error.message);
      });
   });
}

function BuilderCtrlFun($scope) {
   var dbObj = openDatabase();
   var dbDataArray = [];
   $scope.dbData = [];

   $scope.submitToFormView = function () {
      insertToDb($scope.ctrlName, $scope.data.singleSelect, dbObj);
   };

   var getArray = function (resultsrows) {
      dbDataArray = [];
      var length = resultsrows.length,
         i;
      for (i = 0; i < length; i++) {
         dbDataArray.push(resultsrows.item(i));
      }
      $scope.dbData = dbDataArray;
      console.log($scope.dbData);
      $scope.generateViewBuilder = true;
   };

   $scope.generateForm = function () {
      readDb(dbObj, getArray);
   };
}

document.addEventListener('deviceready', onDeviceReady, false);
var formbuilder = angular.module('formbuilder', ['ui.router']);

formbuilder.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
   configRoutes($stateProvider, $urlRouterProvider);
}]);
formbuilder.controller('BuilderCtrl', ['$scope', function ($scope) {
   BuilderCtrlFun($scope);
}]);
document.addEventListener('DOMContentLoaded', function () {
   M.AutoInit();
});