rockola.factory('vote', [ // Dependencies
                            'client',
                            'socket',
                            'party',
                          function (
                            // Dependencies
                            $client,
                            $socket,
                            $party
                          ){

    // Models
    var client = $client,
        socket = $socket,
        party  = party;

    // Factory object
    var vote = {};
    
    // Methods
	vote.user_has_voted = function(YouTube_Song_Object){

		var song_index = party.find(YouTube_Song_Object),
            votes      = party.playlist[song_index].votes,
            device_id  = client.device_id,
		    i          = 0,
		    l          = votes.length;

		for(i=0; (i<l); i++){
		    var  vote = votes[i];
		    if(vote === device_id){
		      return true;
		    }
		}

	  	return false;

	};

    vote.add_vote = function(YouTube_Song_Object){    
      var song_index = _this.party.find(YouTube_Song_Object),
          userVoted  = vote.user_has_voted(YouTube_Song_Object);
          
      if(userVoted === false){
        _this.party.playlist[song_index].votes.push(_this.deviceId);
        _this.party.playlist = _this.arrangePlaylist();
        socket.emit('vote:song', {
            song : YouTube_Song_Object,
            user : _this.deviceId
          });
      }
    }

    // Return object.
    return vote;
  
}]);