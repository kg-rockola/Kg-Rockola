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
				'search',
				{
					url 	    : '/search',
					templateUrl : root.partials    + 'search.html',
					controller  : 'search_controller as search_controller'
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