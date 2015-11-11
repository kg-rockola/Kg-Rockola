(function(){

'use strict';

rockola.controller('app_controller', ['$scope',
                                      'socket',
                                      'client',
                                      'party',
                                    function(
                                        $scope,
                                        $socket,
                                        $client,
                                        $party
                                    ){
    // Models
    var socket = $socket,
    	  party  = $party,
        client = $client;

    // Methods
    $scope.match_state = function(state){
    	if(client.get_state() === state){
    		return true;
    	} else {
    		return false;
    	}
    }

    // Socket events
    socket.on('init', function(data){
    	party.host        = data.party.host;
    	party.playlist    = data.party.playlist;
      party.current_song = data.party.current_song;

    	var unique_id    = sessionStorage.getItem('deviceId'),
          current_song = sessionStorage.getItem('currentSong');

    if(unique_id){
    	client.device_id = unique_id;
    } else {
        client.device_id = data.deviceId;
        sessionStorage.setItem('deviceId', data.deviceId);
    }

    if(current_song){
      party.current_song = current_song;
    } else {
      party.current_song = data.current_song;
      sessionStorage.setItem('current_song', data.current_song);
    }

  });

  socket.on('vote:registered', function($playlist){
    party.playlist = $playlist;
  });

  socket.on('song:added', function($playlist){
    party.playlist = $playlist;
  });

  socket.on('song:removed', function($playlist){
    party.playlist = $playlist;
  });

  socket.on('playlist:updated', function($playlist){
    party.playlist = $playlist;
  });

  socket.on('hosting:party', function($id){
    party.host = $id;
  });

  socket.on('party:stoped', function(){
    party.host = null;
  });

  socket.on('current_song:updated', function($current_song){
    party.current_song = $current_song;
  });


}]);

})();