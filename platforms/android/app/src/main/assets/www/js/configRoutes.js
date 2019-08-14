function configRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'views/formbuilder.html',
			controller: 'BuilderCtrl'
		})
		.state('home.formviewer', {
			url: '/formviewer',
			templateUrl: 'views/formviewer.html',
			controller: 'ViewerCtrl',
			params: {
				'show': true
			}
		})
		.state('generateform', {
			url: '/generateform',
			templateUrl: 'views/formviewer.html',
			controller: 'ViewerCtrl'
		})
		;
	$urlRouterProvider.otherwise('/home');
}

formbuilder.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	configRoutes($stateProvider, $urlRouterProvider);
}]);

