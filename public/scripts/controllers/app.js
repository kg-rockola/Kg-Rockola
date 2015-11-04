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

      	party.host     = data.party.host;
      	party.playlist = data.party.playlist;

      	var unique_id = sessionStorage.getItem('deviceId');

	    if(unique_id){
	    	client.device_id = unique_id;
	    } else {
	        client.device_id = data.deviceId;
	        sessionStorage.setItem('deviceId', data.deviceId);
	    }

    });

}]);

})();