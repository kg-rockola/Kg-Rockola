var app = angular.module('myApp', []);
app.controller('search_controller', function($scope,$http) {
    $scope.init = function() {
       $scope.searchParam="";
	   $scope.hasvalues=false;
	   $scope.curentPlaylist = [];
       $scope.searchTrackList = [];
    }

    $scope.search = function(){
    	if($scope.searchParam!=""){
    		$http.get("https://api.spotify.com/v1/search?q="+$scope.searchParam+"&type=track")
    		.success(function(response) { 
    			console.log( response.tracks.items);
    			$scope.searchTrackList =  response.tracks.items;   
    		}); 
    	}
    }

    $scope.addSong = function(song){
    	console.log( song.name);
    	$scope.curentPlaylist = $scope.curentPlaylist.push(song);
    }


    $scope.getDurationMinutes = function(millis){
		var minutes = Math.floor(millis / 60000);
  		var seconds = ((millis % 60000) / 1000).toFixed(0);
  		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

 
});