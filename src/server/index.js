const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server, {origins: 'https://chat.braverthanman.com:* https://quick-chat-app.herokuapp.com:* http://localhost:*'});
const { ADD_USER, BAD_NAME, USER_CONNECTED, ROOM_CONNECT, SEND_PEER } = require('../constants');
const uuidv4 = require('uuid/v4');
const { createUser } = require('../factories');


//declare port number
const PORT = process.env.PORT || 3001

let connectedUsers = {};


app.use( express.static(__dirname + '/../../build'));

//Set up initial connection and handle connections
io.on('connection', function(socket) {
    console.log('Connected to socket ' + socket.id);


    //Checks if username is taken before adding user to lobby
    socket.on(USER_CONNECTED, function(username, callback){
        if(username in connectedUsers){
            callback({nameTaken: true, user:null});
        }else{
            callback({nameTaken: false, user:createUser(username, socket.id)});
        }
    });



    //Adds a user to the lobby
    socket.on(ADD_USER, function(user){
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user

        console.log(connectedUsers);
        socket.broadcast.emit(ADD_USER, connectedUsers);

    });

    //Connects two users to a room 
    socket.on(ROOM_CONNECT, function(usertoConnect, currentUser, callback){
        console.log("Request for " + currentUser.name + " to join " + usertoConnect);
        console.log(usertoConnect in connectedUsers);

        if(usertoConnect === currentUser.name){
            callback(false, "That's your name!", null);
        }
        
        if(usertoConnect in connectedUsers){
            const roomID = uuidv4();
            console.log("Now connected " + currentUser + " to " + usertoConnect);
            socket.join(roomID);
            console.log("User " + socket.id + " joined room " + roomID);                
            socket.to(connectedUsers[usertoConnect].socketID).emit('ROOM_REQUEST', roomID );
            callback(true, null, roomID);
        }else{
            callback(false, "User does not exist!", null);
        }
    });

    socket.on("ACCEPT_ROOM_REQUEST", function(roomID){
        socket.join(roomID);
        console.log(socket.id + " joined room " + roomID);        
    });

    socket.on(SEND_PEER, function(data, roomID){
        console.log("Peer being sent to " + roomID);
        
        socket.to(roomID).emit("PEER_SENT", data);
    });
});


//start server on PORT
server.listen(PORT, function(){
    console.log('Connected to port ' + PORT + '...');
});



//helper function to add new users
function addUser(userList, user){
	let newList = Object.assign({}, userList);
	newList[user.name] = user;
	return newList;
}

function userExists(userList, user){
    Object.keys(userList).forEach(function(loggedUser){
        if(loggedUser.name.equals(user.name)){
            return true;
        }
    });
    return false;
}


