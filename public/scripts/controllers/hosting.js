 (function(){

'use strict';

rockola.controller('hosting_controller', ['youtube_player',
                                          'party',
                                          '$state',
                                          'client',
                                          'socket',
                                        function(
                                           $youtube_player,
                                           $party,
                                           $state,
                                           $client,
                                           $socket
                                        ){

  // Controller alias.
  var _this = this;

  // Controller members.
  _this.youtube_player = $youtube_player;
  _this.party          = $party;
  _this.client         = $client;
  _this.socket         = $socket;
  _this.partying       = false;

  // Methods
  _this.stop_hosting = function(){
    _this.socket.emit('stop:party');
    _this.party.host = null;
    _this.youtube_player.destroy();
    _this.partying = false;
  }

  _this.start_party = function(){
    YT.ready(
      function() {
        _this.youtube_player.init();
        _this.partying = true;
        _this.socket.emit('host:party', _this.client.device_id);
        _this.party.host = _this.client.device_id;
      }
    );
  }

}]);

})();