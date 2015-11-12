 (function(){

'use strict';

rockola.controller('hosting_controller', ['youtube_player',
                                          'party',
                                          '$state',
                                          'client',
                                          'socket',
                                          '$scope',
                                        function(
                                           $youtube_player,
                                           $party,
                                           $state,
                                           $client,
                                           $socket,
                                           $scope
                                        ){

  // Controller alias.
  var _this = this;

  // Controller members.
  _this.youtube_player       = $youtube_player;
  _this.party                = $party;
  _this.client               = $client;
  _this.socket               = $socket;
  _this.state                = $state;
  _this.partying             = false;

  // Methods
  _this.stop_hosting = function(){
    _this.party.stop_hosting();
    _this.youtube_player.destroy();
    _this.partying = false;
  }

  _this.go_back = function(){
    _this.stop_hosting();
    _this.state.go('app.vote');
  }

  _this.start_party = function(){
    YT.ready(
      function() {
        _this.youtube_player.init();
        _this.partying = true;
      }
    );
  }

  _this.next_song = function(){
    _this.youtube_player.song_ended();
  }

  _this.remove_song = function($track){
    if($track.state === 'playing') {
      _this.next_song();
    }
    
    _this.party.remove_song($track.song);
    
  }

  _this.init_client = function(){
    _this.socket.emit('host:party', _this.client.device_id);
    _this.party.host = _this.client.device_id;
  }

  // Init.
  _this.init = function(){
    _this.partying = false;
    _this.init_client();
  };

  // Angular events.
  $scope.$on('playlist:updated', function(){
    if(_this.party.playlist.length < 1){
      _this.partying = false;
    }
  });

  $scope.$on('stop:hosting', function(){
    _this.stop_hosting();
  });

  $scope.$on('services:initialized', function(){
    _this.init_client();
  });

}]);

})();