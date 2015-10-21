(function(){

'use strict';

rockola.controller('search_controller', ['$scope',
                                         '$http',
                                         '$sce',
                                         '$timeout',
                                         'socket',
                                        function(
                                          $scope,
                                          $http,
                                          $sce,
                                          $timeout,
                                          socket
                                        ) {
    $scope.currentTrackList = [];
    
    $scope.init = function() {
       $scope.searchParam      = "";
       $scope.currentTrack     = "4th1RQAelzqgY7wL53UGQt";
       $scope.containerIframe  = "";
       $scope.currentTrackList = [];
       $scope.foundTracks      = [];
    }


    $scope.search = function(){
        if($scope.searchParam){
            var queryUrl = "https://api.spotify.com/v1/search?q="+$scope.searchParam+"&type=track";

            $http.get(queryUrl)
                .success(function(response) { 
                    $scope.foundTracks =  response.tracks.items;   
                }); 
        }
    }

    // $scope.setTimer = function(songDuration){
        
    // }

    $scope.addSong = function($song){
        // $song.score = 0;
        // $scope.currentTrackList.push($song);
        // console.log( $scope.currentTrackList);
        // $scope.getSong();

        socket.emit('update:playlist', $song);
        $scope.addToPlaylist($song);
    };

    $scope.addToPlaylist = function(song){
        $scope.currentTrackList.push(song);
    };

    $scope.getSong = function(){
        if($scope.currentTrackList.length !== 0){
            var ind= $scope.getIndex();
            $scope.currentTrack=  $scope.currentTrackList[ind];
            $scope.containerIframe= $sce.trustAsHtml('<iframe id="widgetId" src="https://embed.spotify.com/?uri=spotify:track:'+ $scope.currentTrack.id+ '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
        }

        // $( "#containerIframe" ).click(function() {
        //     alert( "Handler for .click() called." );
        // });
        // $( "#outerWidgetContainer" ).click(function() {
        //     alert( "Handler for .click() called." );
        // });        
        // $( ".clickable .play-pause-btn" ).click(function() {
        //     alert( "Handler for .click() called." );
        // });
        
    };

    $scope.nextSong = function(){
        $scope.getSong();
    };

    $scope.PauseSong = function(){
        console.log("Paused");
    };

    $scope.PauseSong = function(){
        console.log("Paused");
    };

    $scope.onDislikeSong = function(ev) {
      alert('You DisLike a Song!!');
    };

    $scope.onLikeSong = function(ev) {
      alert('You Like a Song!!');
    };

    $scope.getIndex = function(){
        var rand= Math.floor( (Math.random()*$scope.currentTrackList.length) );
        console.log("random numerber is:"+ rand);
        return rand;
    };

    $scope.clearFilter = function(song){
        $scope.foundTracks = [];
        $scope.searchParam="";
    };

    $scope.getDurationMinutes = function(millis){
        var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    // Socket events
    
    socket.on('playlist:updated', function(song){
        $scope.addToPlaylist(song);
        console.log($scope.currentTrackList);
    });

}]);

})();