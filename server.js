//var config = require("./config.js")();
var open   = require("open");
var _port  = 8888;

var express       = require('express'); // Express web server framework
var request       = require('request'); // "Request" library
var querystring   = require('querystring');
var cookieParser  = require('cookie-parser');
var redirect_uri  = 'http://localhost:'+_port+'/callback'; // Your redirect uri


// Youtube

var YouTube_Node = require('youtube-node'),
    youtube      = new YouTube_Node(),
    appKey       = "AIzaSyDrvTaEi2w7ASFkKQKs7HP_3wGce5IGtk8";

youtube.setKey(appKey);
youtube.addParam('type', 'video');

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

var server = app.listen(_port, function(){
  var url = "http://localhost:"+_port;
  console.log("Serving at: "+url);
  // open(url);
});

// Sockets

var io       = require("socket.io").listen(server);
var party    = {
  host     : null,
  playlist : []
};

io.on("connection", handleIO);

function handleIO(socket){
  // Logs
  console.log("Server connected");
  socket.on("disconnect", disconnect);
  function disconnect(){
      console.log("Server disconnected");
      // socket.disconnect(true);
      // socket.broadcast.emit('user:left', 'User disconnected');
  }

  socket.emit('get:playlist', party.playlist);

  socket.emit("init", {
    party    : party,
    deviceId : guid()
  });
  
  socket.on('add:song', function(songData){
      party.playlist.push(songData);
      party.playlist = arrangePlaylist();
      socket.broadcast.emit('song:added', party.playlist);
  });

  socket.on('host:party', function(hostId){
    party['host'] = hostId;
    socket.broadcast.emit('hosting:party', hostId)
  });

  socket.on('searching:youtube', function(query){
    youtube.search(query, 24, function(error, result){
      if(error){
        socket.emit('youtube:result:failed', error);
      } else {
        socket.emit('youtube:result', result);
      }
    })
  });

  socket.on('stop:party', function(){
    party['host'] = null;
    socket.broadcast.emit('party:stoped', null)
  });

  socket.on('vote:song', function(voteData){
    var songIndex = getSongIndex(voteData.song.id.videoId),
        userVoted = getUserVoted(voteData.user, songIndex);

    if(userVoted === false){
      party.playlist[songIndex].votes.push(voteData.user);
      party.playlist = arrangePlaylist();
      socket.broadcast.emit('vote:registered', party.playlist);
    }

  });

};

io.configure(function(){
  io.enable("browser client minification");
  io.enable("browser client etag");
  io.set("log level", 1);
  io.set("transports", [
      "websocket",
      "xhr-polling",
      "jsonp-polling"
    ]);
});

// Helpers 

function arrangePlaylist(){
  var i        = 0,
      playlist = party.playlist.slice(),
      filtered = [],
      l        = playlist.length;

    for(i; (i<l); i++){
      var mostRated = getMostRated(playlist);
      filtered.push(playlist[mostRated]);
      playlist.splice(mostRated, 1);
    }

    return filtered;
}


function getMostRated(playlist){
  var i           = 0,
      l           = playlist.length,
      mostRated   = playlist[0].votes.length,
      mostPopular = 0;

  for(; (i<l); i++){
    var track = playlist[i].votes.length;
    if(track > mostRated){
      mostRated   = track;
      mostPopular = i;
    }
  }

  return mostPopular;

}

function getUserVoted(user, songIndex){
  var votes = party.playlist[songIndex].votes,
      i = 0,
      l = party.playlist[songIndex].votes.length;

  for(; (i<l); i++){
    var  vote = votes[i];
    if(vote === user){
      return true;
    }
  }

  return false;

}

function getSongIndex(song){
  var i = 0,
      l = party.playlist.length;
  for(; (i<l); i++){
    var  track = party.playlist[i].song;
    if(track.id === song){
      return i;
    }
  }

  return false;

}

function guid() { // Globally unique identifier
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}