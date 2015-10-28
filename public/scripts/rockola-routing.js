'use strict'

rockola.config(
			  ['$stateProvider',
			   '$urlRouterProvider',
			   '$locationProvider',
	function(	$stateProvider, 
			 	$urlRouterProvider, 
			 	$locationProvider
			){
			// $locationProvider.html5Mode(true);
			// Default URL
			$urlRouterProvider.otherwise('/');
	
			var root = {
				partials    : 'partials/',
				directives  : 'partials/directives/'
			};
	
			// Aplication states
			$stateProvider
				.state(
					'app',
					{
						url 	    : '/',
						templateUrl : root.partials + 'app.html'
					}
				)
				.state(
					'login',
					{
						url 	    : '/login',
						templateUrl : root.partials + 'login.html',
						controller  : 'login_controller' 
					}
				)
				.state(
					'hosting',
					{
						url 	    : '/hosting',
						templateUrl : root.partials + 'hosting.html',
						controller  : 'hosting_controller'
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
]);