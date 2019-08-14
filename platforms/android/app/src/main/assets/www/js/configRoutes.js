function configRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('formbuilder', {
			url: '/formbuilder',
			templateUrl: 'views/formbuilder.html',
			controller: 'BuilderCtrl'
			// views: {
			// 	'formbuilder': {
			// 		templateUrl: 'views/formbuilder.html',
			// 		controller: 'BuilderCtrl'
			// 	},
			// 	'formviewer': {
			// 		templateUrl: 'views/formviewer.html',
			// 		controller: 'ViewerCtrl'
			// 	}
			// }
		})
		.state('formviewer', {
			url: '/formviewer',
			templateUrl: 'views/formviewer.html',
			controller: 'ViewerCtrl'
		});
	$urlRouterProvider.otherwise('/formbuilder');
}

formbuilder.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	configRoutes($stateProvider, $urlRouterProvider);
}]);

