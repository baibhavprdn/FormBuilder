function onDeviceReady() {
   console.log('cordova ready');
   angular.bootstrap(document.body, ['formbuilder']);
}

document.addEventListener('deviceready', onDeviceReady, false);
var formbuilder = angular.module('formbuilder', ['ui.router']);
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('select');
   var instances = M.FormSelect.init(elems);
});

// function initializeSelect() {

// }

formbuilder.run(['$transitions', function ($transitions) {
   $transitions.onSuccess({ to: '**' }, function () {
      M.AutoInit();
   });
}]);

