function onDeviceReady() {
   console.log('cordova ready');
   angular.bootstrap(document.body, ['formbuilder']);
}

document.addEventListener('deviceready', onDeviceReady, false);
var formbuilder = angular.module('formbuilder', ['ui.router']);

formbuilder.run(['$transitions', function ($transitions) {
   $transitions.onSuccess({ to: '**' }, function () {
      M.AutoInit();
   });
}]);

