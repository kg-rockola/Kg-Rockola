'use strict'

rockola.config(
	function($stateProvider, $urlRouterProvider){
		// Default URL
		$urlRouterProvider.otherwise('/404');

		var root = {
			partials    : 'partials/',
			controllers : 'scripts/controllers/'
		};

		// Aplication states
		$stateProvider
			.state(
				'login',
				{
					url 	    : '/login',
					templateUrl : root.partials + 'login.html'
				}
			)
			.state(
				'app',
				{
					url 	    : '/app',
					templateUrl : root.partials    + 'app.html'
				}
			)
			.state(
				'404',
				{
					url 	    : '/404',
					templateUrl : root.partials + '404.html'
				}
			)

	}
);