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
			$urlRouterProvider.otherwise('/search');
	
			var root = {
				partials    : 'partials/',
				directives  : 'partials/directives/'
			};
	
			// Aplication states
			$stateProvider
				.state(
					'search',
					{
						url 	    : '/search',
						templateUrl : root.directives + 'search_song.html',
						controller  : 'search_controller as search_ctrl'
					}
				)
				.state(
					'vote',
					{
						url 	    : '/vote',
						templateUrl : root.directives + 'vote_song.html',
						controller  : 'vote_controller as vote_ctrl'
					}
				)
				.state(
					'play',
					{
						url 	    : '/play',
						templateUrl : root.directives + 'play_music.html',
						controller  : 'play_music_controller as play_ctrl'
					}
				)
	
	
		}
]);