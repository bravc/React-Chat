import React, { Component } from 'react';
import io from 'socket.io-client';

import '../css/index.css';

import Login from './Login';
import MainChat from './MainChat';

import {ADD_USER} from '../constants';
import { socketUrl } from '../config';

class Layout extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			socket: null,
			user: null
		};
	}
	
	//init socket when comp mounts
	componentWillMount() {
		this.initSocket();
	}
	
	initSocket = ()=> {
		const socket = io(socketUrl);
		socket.on('connect', ()=> {
			console.log("Connected to socket");
		})
		this.setState({socket});
	}

	setUser = (user) => {
		const { socket } = this.state;
		socket.emit(ADD_USER, user);
		this.setState({user: user});
	}

	
	
	render() {
		const {socket, user} = this.state;
		return (
			user ?
			<MainChat socket={socket} user={user} />
			:
			<Login socket={socket} setUser={this.setUser}/>
		);
	}
}


export default Layout;