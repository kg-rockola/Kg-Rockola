var rockola = angular.module("rockola", []);

rockola.controller("logIn", ["$scope",
							 "logInService",
							 function(
							 		$scope,
							 		logger
							 	){

	

}]);


rockola.service("logInService", [// Dependencies
		             			 function(
		             			 	// Params
								 ){

    var data = {
    	hashParams : getHashParams()
    };

    return data;

}]);

function getHashParams() {
	var hashParams = {};
	var e, r = /([^&;=]+)=?([^&;]*)/g,
	    q = window.location.hash.substring(1);

	while ( e = r.exec(q)) {
	   hashParams[e[1]] = decodeURIComponent(e[2]);
	}

	return hashParams;
}

var socket = io.connect('/');

socket.on("connect", function(){
	console.log("Connected.");
});

socket.on("disconnect", function(){
	console.log("Disconnected.");
});

socket.on("deviceToken", function(data){
	console.log(data);
});