 (function(){

'use strict';

rockola.controller('host_controller', ['youtube_player',
                                          'party',
                                          'client',
                                          'socket',
                                        function(
                                           $youtube_player,
                                           $party,
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

  // Methods
  _this.host = function(){      
    _this.socket.emit('host:party', _this.client.device_id);
    _this.party.host = _this.client.device_id;
  }


}]);

})();