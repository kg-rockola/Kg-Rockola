rockola.controller('search_controller', function($scope,$http,$sce,$timeout) {
    $scope.curentTrackList;

    $scope.init = function() {
       $scope.searchParam="";
       $scope.currentTrack="4th1RQAelzqgY7wL53UGQt";
       $scope.containerIframe= "";
       $scope.curentTrackList = [];
       $scope.searchTrackList = [];

    }


    $scope.search = function(){
    	if($scope.searchParam!=""){
    		$http.get("https://api.spotify.com/v1/search?q="+$scope.searchParam+"&type=track")
    		.success(function(response) { 
    			//console.log( response.tracks.items);
    			$scope.searchTrackList =  response.tracks.items;   
    		}); 
    	}
    }

    $scope.setTimer = function(songDuration){
        
    }

    $scope.addSong = function($song){
        $song.score = 0;
        $scope.curentTrackList.push($song);
        console.log( $scope.curentTrackList);
        $scope.getSong();
    }
    $scope.getSong = function(){
        if($scope.curentTrackList.length !== 0){
            var ind= $scope.getIndex();
            $scope.currentTrack=  $scope.curentTrackList[ind];
            $scope.containerIframe= $sce.trustAsHtml('<iframe id="widgetId" src="https://embed.spotify.com/?uri=spotify:track:'+ $scope.currentTrack.id+ '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
        }
        $( "#containerIframe" ).click(function() {
            alert( "Handler for .click() called." );
        });
        $( "#outerWidgetContainer" ).click(function() {
            alert( "Handler for .click() called." );
        });        
        $( ".clickable .play-pause-btn" ).click(function() {
            alert( "Handler for .click() called." );
        });
        
    }

    $scope.nextSong = function(){
        $scope.getSong();
    }
    $scope.PauseSong = function(){
        console.log("Paused");
    }
    $scope.PauseSong = function(){
        console.log("Paused");
    }
    $scope.onDislikeSong = function(ev) {
      alert('You DisLike a Song!!');
    };
    $scope.onLikeSong = function(ev) {
      alert('You Like a Song!!');
    };

    $scope.getIndex = function(){
        var rand= Math.floor( (Math.random()*$scope.curentTrackList.length) );
        console.log("random numerber is:"+ rand);
        return rand;
    }

    $scope.clearFilter = function(song){
        $scope.searchTrackList = [];
        $scope.searchParam="";
    }

    $scope.getDurationMinutes = function(millis){
		var minutes = Math.floor(millis / 60000);
  		var seconds = ((millis % 60000) / 1000).toFixed(0);
  		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }


 
});