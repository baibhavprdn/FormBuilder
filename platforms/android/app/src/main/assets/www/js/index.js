function onDeviceReady() {
   console.log('cordova ready');
   angular.bootstrap(document.body, ['formbuilder']);
}

function openDatabase(db) {

   function successcb() {
      console.log('Database opened successfully');
   }

   function errorcb(error) {
      console.log('failed to open databae' + JSON.stringify(error));
   }

   var dbObj = window.sqlitePlugin.openDatabase({
      name: 'formBuilder.db',
      location: 'default'
   }, successcb, errorcb);
   dbObj.transaction(function (tx) {
      tx.executeSql('CREATE TABLE controlDefinitions (id integer primary key, Name text, Type text)', [], successcb, errorcb);
   });
   db(dbObj);
}

function insertToDb(ctrlName, ctrlType, dbObj) {
   // dbObj.transaction(function (tx) {
   //    tx.executeSql('CREATE TABLE controlDefinitions (id integer primary key, Name text, Type text)', [], function () {
   //       console.log('Table created successfully');
   //    }, function (error) {
   //       console.log('Failed to create table', JSON.stringify(error));
   //    });
   // });
}

function ControlBuilderCtrlFun($scope) {
   $scope.submitToFormView = function () {

      var db = function (dbObj) {
         insertToDb($scope.ctrlName, $scope.ctrlType, dbObj);
      };
      openDatabase(db);

   };
}

document.addEventListener('deviceready', onDeviceReady, false);
var formbuilder = angular.module('formbuilder', ['ui.router']);

formbuilder.controller('ControlBuilderCtrl', ['$scope', function ($scope) {
   ControlBuilderCtrlFun($scope);
}]);

document.addEventListener('DOMContentLoaded', function () {
   M.AutoInit();
});