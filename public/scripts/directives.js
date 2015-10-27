'use strict';

var root = 'partials/directives/';

rockola.directive(
	// HTML: rla-play-music
	'rlaPlayMusic', 
	// Configuration
	function() {
	  return {
	    restrict    : 'E',
	    templateUrl : root + 'play_music.html',
	    controller  : 'play_music_controller'
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
	    templateUrl : root + 'search_song.html',
	    controller  : 'search_controller'
	 };
	}
);

rockola.directive(
	// HTML: rla-vote-song
	'rlaVoteSong', 
	// Configuration
	function() {
	  return {
	    restrict    : 'E',
	    templateUrl : root + 'vote_song.html',
	    controller  : 'vote_controller'
	 };
	}
);

rockola.directive(
	// HTML: rla-no-songs-added
	'rlaNoSongsAdded', 
	// Configuration
	function() {
	  return {
	    restrict    : 'E',
	    templateUrl : root + 'no_songs_added.html'
	 };
	}
);