(function(){

'use strict';

rockola.controller('app_controller', ['$scope',
                                      'socket',
                                    function(
                                        $scope,
                                        socket
                                    ){

    $scope.party    = [];
    $scope.deviceId = '';

    $scope.addToPlaylist = function(song){
        $scope.party.playlist.push(song);
    };

    $scope.getSongIndex = function(song){
	  var i = 0,
	      l = $scope.party.playlist.length;
	  for(; (i<l); i++){
	    var  track = $scope.party.playlist[i].song;
	    if(track.id === song){
	      return i;
	    }
	  }

	  return false;

	};

	$scope.getUserVoted = function(user, songIndex){
	  var votes = $scope.party.playlist[songIndex].votes,
	      i = 0,
	      l = $scope.party.playlist[songIndex].votes.length;

	  for(; (i<l); i++){
	    var  vote = votes[i];
	    if(vote === user){
	      return true;
	    }
	  }

	  return false;

	}

	$scope.arrangePlaylist = function(){
		var i 		 = 0,
			playlist = angular.copy($scope.party.playlist),
			filtered = [],
	      	l 		 = playlist.length;

	    for(i; (i<l); i++){
	    	var mostRated = getMostRated(playlist);
	    	filtered.push(playlist[mostRated]);
	    	playlist.splice(mostRated, 1);
	    }

	    return filtered;

	}

	// Helpers

	function getMostRated(playlist){
		var i 			= 0,
			l 			= playlist.length,
			mostRated   = playlist[0].votes.length,
			mostPopular = 0;

		for(; (i<l); i++){
			var track = playlist[i].votes.length;
			if(track > mostRated){
				mostRated 	= track;
				mostPopular = i;
			}
		}

		return mostPopular;

	}
    
    // Socket events

    socket.on('init', function(data){
      $scope.party = data.party;

      var uniqueId = sessionStorage.getItem('deviceId');

      if(uniqueId){
        $scope.deviceId = uniqueId;
      } else {
        $scope.deviceId = data.deviceId;
        sessionStorage.setItem('deviceId', data.deviceId);
      }
    });

}]);

})();

// access thingy: https://accounts.spotify.com/authorize/?client_id=d93e2fde46004036b48b8939da51fce5&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2F%23%2F