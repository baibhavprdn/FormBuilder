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

formbuilder.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	configRoutes($stateProvider, $urlRouterProvider);
}]);

