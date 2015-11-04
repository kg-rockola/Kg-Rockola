(function(){

'use strict';

rockola.controller('vote_controller', [ 'party',
                                        'vote',
                                        'client',
                                        'socket',
                                      function(
                                         $party,
                                         $vote,
                                         $client,
                                         $socket
                                      ) {

    // Controller alias.
    var _this = this;

    // Controller members.
    _this.party  = $party;
    _this.client = $client;
    _this.socket = $socket;
    _this.vote   = $vote;

    // Controller methods.
    _this.vote = function(YouTube_Song_Object){
      _this.vote.add_vote(YouTube_Song_Object);
    };

    _this.userHasVoted = function(songId){
      var songIndex = _this.getSongIndex(songId),
          userVoted = _this.getUserVoted(_this.deviceId, songIndex);
        return userVoted;
    };

    // Socket events.
    _this.socket.on('vote:registered', function(playlist){
      _this.party.playlist = playlist;
      _this.party.playlist = _this.arrangePlaylist();
    });
    

}]);

})();