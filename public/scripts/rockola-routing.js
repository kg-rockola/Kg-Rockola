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
					'addSong',
					{
						url 	    : '/addSong',
						templateUrl : root.directives + 'search_song.html'
					}
				)
	
		}
]);