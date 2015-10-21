'use strict';

var root = 'partials/directives/';

rockola.directive(
	// HTML: rla-play-music
	'rlaPlayMusic', 
	// Configuration
	function() {
	  return {
	    restrict    : 'E',
	    templateUrl : root + 'play_music.html'
	 };
	}
);

rockola.directive(
	// HTML: rla-search-song
	'rlaSearchSong', 
	// Configuration
	function() {
	  return {
	    restrict    : 'E',
	    templateUrl : root + 'search_song.html'
	 };
	}
);

rockola.directive(
	// HTML: rla-search-song
	'rlaVoteSong', 
	// Configuration
	function() {
	  return {
	    restrict    : 'E',
	    templateUrl : root + 'vote_song.html'
	 };
	}
);