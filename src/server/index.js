const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server, {origins: 'https://chat.braverthanman.com:* https://quick-chat-app.herokuapp.com:* http://localhost:*'});
const { ADD_USER, BAD_NAME } = require('../constants');

//declare port number
const PORT = process.env.PORT || 3001

let connectedUsers = {};


app.use( express.static(__dirname + '/../../build'));

//Set up initial connection and handle connections
io.on('connection', function(socket) {
    console.log('Connected to socket ' + socket.id);

});

app.post('/login', function(req, res){
    console.log(req.params);
    res.redirect("/");
});

//start server on PORT
server.listen(PORT, function(){
    console.log('Connected to port ' + PORT + '...');
});

