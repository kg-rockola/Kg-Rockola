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
    $scope.playlist = [];
    
    $scope.init = function() {
       $scope.searchParam      = "";
       $scope.currentTrack     = "";
       $scope.containerIframe  = "";
       $scope.playlist = [];
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

     // $scope.setTimer = function(){
        
     // }

    $scope.addSong = function($song){
        // $song.score = 0;
        // $scope.playlist.push($song);
        // console.log( $scope.playlist);
        // $scope.getSong();

        socket.emit('update:playlist', $song);
        $scope.addToPlaylist($song);
    };

    $scope.addToPlaylist = function(song){
        $scope.playlist.push(song);
    };

    $scope.getSong = function(){
        if($scope.playlist.length !== 0){
            var ind= $scope.getIndex();
            $scope.currentTrack=  $scope.playlist[ind];
            var track = spotify.createFromLink('spotify:track:05JqOBN6XW4eFUVQlgR0I3');
            //$scope.containerIframe= $sce.trustAsHtml('<iframe id="widgetId" ng-click="setTimer()" src="https://embed.spotify.com/?uri=spotify:track:'+ $scope.currentTrack.id+ '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
            
            console.log(track);
        }
    };

    $scope.nextSong = function(){
        $scope.getSong();
    };

    $scope.PauseSong = function(){
        console.log("Paused");
    };

    $scope.getIndex = function(){
        var rand= Math.floor( (Math.random()*$scope.playlist.length) );
        console.log("random number is:"+ rand);
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
        console.log($scope.playlist);
    });


}]);

})();