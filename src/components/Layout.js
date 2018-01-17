import React, { Component } from 'react';
import io from 'socket.io-client';

import '../css/index.css';

import Login from './Login';
import {USER_CONNECTED} from '../constants';

import { socketUrl } from '../config';

class Layout extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			socket: null,
			user: null
		};
	}
	
	
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

	
	
	render() {
		const {socket} = this.state;
		return (
			<Login socket={socket}/>
		);
	}
}


export default Layout;