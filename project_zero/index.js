var path = require('path');
var express = require('express');
var http = require('http');
var socketio = require('socket.io');



var app = express();
var server = http.createServer(app);
app.use(express.static(path.join(__dirname,'html')));

var io = socketio.listen(server);

var clientID = 0;


io.on('connection', function (socket) {
	clientID++;
	var myID = clientID;
	socket.emit("logInfo", {"id":myID})
	console.log('ligou-se um cliente');

	socket.on("login", function (data) {
		console.log('ligou-se o cliente '+ myID +' com o nome '+ data.login);
	})

});


app.get('/',function(req,res) {
  res.send('ola mundo');
});



server.listen(5000);
