'use strict'

rockola.config(
	function($stateProvider, $urlRouterProvider){
		// Default URL
		$urlRouterProvider.otherwise('/');

		var root = {
			partials    : 'partials/',
			directives  : 'partials/directives/'
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
					url 	    : '/',
					templateUrl : root.partials + 'app.html'
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