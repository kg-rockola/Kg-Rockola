//var config = require("./config.js")();
var open   = require("open");
var _port  = 8888;

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express       = require('express'); // Express web server framework
var request       = require('request'); // "Request" library
var querystring   = require('querystring');
var cookieParser  = require('cookie-parser');
var client_id     = '03ffe0cac0a0401aa6673c3cf6d02ced'; // Your client id
var client_secret = 'a57c43efb9644574a96d6623fb8bfbc2'; // Your client secret
var redirect_uri  = 'http://localhost:'+_port+'/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

var server = app.listen(_port, function(){
  var url = "http://localhost:"+_port;
  console.log("Serving at: "+url);
  // open(url);
});

// Spotify

var client_id    = 'd93e2fde46004036b48b8939da51fce5',
    redirect_uri = 'http://localhost:8888/#/';

app.get('/login', function(req, res) {
  var scopes = 'user-read-private user-read-email';
  // res.redirect('https://accounts.spotify.com/authorize/?client_id=d93e2fde46004036b48b8939da51fce5&response_type=code&redirect_uri=http://localhost:8888/callback');

  res.send('test');

  // res.redirect('https://accounts.spotify.com/authorize?' +
  //   querystring.stringify({
  //     response_type: 'code',
  //     client_id: client_id,
  //     redirect_uri: redirect_uri,
  //   }));

});

// Spotify Ends

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

  socket.on('stop:party', function(){
    party['host'] = null;
    socket.broadcast.emit('party:stoped', null)
  });

  socket.on('vote:song', function(voteData){
    var songIndex = getSongIndex(voteData.song),
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