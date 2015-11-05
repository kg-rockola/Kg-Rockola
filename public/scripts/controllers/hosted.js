 (function(){

'use strict';

rockola.controller('hosted_controller', ['youtube_player',
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
  

}]);

})();