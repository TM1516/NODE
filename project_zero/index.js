/**
 * (C) 2016 Pedro Miguel Moreira ESTG/IPVC
 */

// import the needed modules

// util module for path handling
var path = require('path');
// the express framework
var express = require('express');
// the hhtp module (neede to create a http / websocket server)
var http = require('http');
// the socket.io websocket implementation
var socketio = require('socket.io');

// create an express based web app
var app = express();
// configure a static server with root located at "html" folder
app.use(express.static(path.join(__dirname,'html')));

// create a hhtp server for the sockets. attach the app.
var server = http.createServer(app);

//create the socket server listening at port 5000
var io = socketio.listen(server).listen(5000);


// global scope variables
// a client id manager
var clientID = 0;

// a reference to the public screen socket
var publicScreen = null;

// listen for Connections
// each coonectiuon instantiates some logic
io.on('connection', function (socket) {
	// update the global socket id manager
	clientID++;
	// assign a new ID to the connecting client
	var myID = clientID;
	console.log('a new client connected. assigned with id: ', myID);

	// client sent a new nickname
	socket.on("login", function (data) {
		console.log('client '+ myID +' logged with nickname'+ data.login);
		if(publicScreen) {
			//notify the public screen
			publicScreen.emit("user",{"user":data.login, "userid": myID});
		}
		//acknowledge the client for the new nickname
		socket.emit("user",{"user":data.login, "userid": myID});
	});

	// client sent a new message
	socket.on("message", function (data) {
		if (publicScreen) {
			// post the message into the public screen
			publicScreen.emit("message", data);
		}
		console.log(data.user, data.msg);
	});

  // publicScreen just connected
	socket.on("publico", function () {
		publicScreen = socket;
		//console.log(publicScreen);
	});

});


app.get('/',function(req,res) {
  res.send('ola mundo');
});
