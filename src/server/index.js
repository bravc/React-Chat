const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server);
const { ADD_USER, BAD_NAME } = require('../constants');

//declare port number
const PORT = process.env.PORT || 3001

//start server on PORT
server.listen(PORT, function(){
    console.log('Connected to port ' + PORT + '...');
});


let connectedUsers = {};


app.use( express.static(__dirname + '/../../build'));

//Set up initial connection and handle connections
io.on('connection', function(socket) {
    console.log('Connected to socket ' + socket.id);



    socket.on(ADD_USER, (name) => {
        if (connectedUsers[name] === null){
            connectedUsers[name] = name;
        }else{
            socket.emit(BAD_NAME);
        }
    });
});