import React, { Component } from 'react';
import ActiveUsers from './ActiveUsers';
import {ROOM_CONNECT, SEND_SOURCE} from '../constants';
import Peer from 'simple-peer';
import '../css/chat.css';
import { connect } from 'tls';

class MainChat extends Component {

  constructor(props){
    super(props);

    this.state = {
      stream: null,
      error: [],
      playing: false,
      connectUser: "",
      peer: null

    };

        const { socket } = this.props;
        //checks for new source
        socket.on(SEND_SOURCE, (stream) => {
            console.log("Got new stream");
            this.newStream(stream);
        });

        socket.on("ROOM_REQUEST", (roomID) => {
            socket.emit("ACCEPT_ROOM_REQUEST", JSON.parse(roomID));
            const peer = new Peer({initiator: false, stream: this.state.stream});
            this.setState({peer: peer});
            // peer.signal(this.stream);

            console.log("Request Accepted!");
            


        });
    }

    //get video stream
    getVideo = () => {
        const { video } = this.refs;
        const { peer } = this.state;
        navigator.mediaDevices.getUserMedia({video: { width: 100, height: 75 }, audio: false})
        .then((stream) => {
            console.log('Got it');
            this.setState({stream: stream});
            if(peer){
                peer.on('stream', (stream) => {
                    const { connectedVideo } = this.refs;
    
                    console.log("Stream got to here " + stream);
                    console.log(stream);
                    
                    connectedVideo.src = window.URL.createObjectURL(stream);
                    connectedVideo.play();
                });
            }
        })
        .catch((err) => {
            this.setState({error: 'No devices found!'});
            this.refs.on.disabled = true;
            console.log(err);
        })
    }

    //Grabs the video component from the user
    componentWillMount = () => {
        this.getVideo();
    }

    //Grabs the video component from the user
    videoOn = () => {
        const { stream, playing } = this.state;
        const { video, on, card } = this.refs;


        if(playing){
            video.pause();
            video.stop;
            video.srcObject = null;
            // stream.getTracks()[0].stop();
            this.setState({playing: false})

        }else{
            video.srcObject = stream;
            video.play();
            this.setState({playing: true})
        }
    }

    //Once room is connected, sends source to connected user
    newRoom = (userExists, user, roomID) => {
        const { socket } = this.props;
        const { stream } = this.state;
        if(userExists){
            const peer = new Peer({initiator: true, stream: stream});
            this.setState({peer: peer});
            // peer.signal(this.stream);
            peer.on('stream', (stream) => {
                const { connectedVideo } = this.refs;

                console.log("Stream got to here " + stream);
                console.log(stream);
                
                connectedVideo.src = window.URL.createObjectURL(stream);
                connectedVideo.play();

            });
        }else{
            this.setState({error: "User does not exist!"});
        }
    }

    //When you recieve a stream, play it in the window
    newStream = (stream) => {
        const { socket } = this.props;
        const { connectedVideo } = this.refs;

        console.log("Stream got to here " + stream);
        console.log(stream);
        
        connectedVideo.srcObject = stream;
        connectedVideo.play();
    }

    //Submit call to another user
    onSubmit = (e) => {
        const { connectUser } = this.state;
        const { socket } = this.props;
    
        console.log(connectUser);

        socket.emit(ROOM_CONNECT, connectUser, this.props.user, this.newRoom );

        e.preventDefault();
    }

    //Updates state as name is typed
    handleChange = (e) => {
        this.setState({connectUser: e.target.value});
    }






  render() {
    const { error, stream } = this.state;
    const { socket } = this.props;
    return (
        <div className="container">
            <div className="row page">
                    <div className="col">
                        <div className="card">

                            <video className="card-img-top" ref="video">Heyyyyy</video>
                
                            <div className="card-block">
                                <p className="card-text">Make youself look pretty</p>
                                <button className="btn btn-lg btn-primary" id="vid-btn" ref="on" onClick={this.videoOn}> Show Camera </button>
                                <div className="error">{error}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <form className="form-group"  onSubmit={this.onSubmit}  id="form-chat">
                                <input className="form-control" ref="connectUser" onChange={this.handleChange} type="text" placeholder="Enter a user to chat with"/>
                                <div className="error">{error}</div>
                                <button className="btn btn-lg btn-primary" id="vid-btn" type="submit">Lets Chat!</button>
                            </form>
                        </div>
                    </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <video className="card-img-top" ref="connectedVideo">Heyyyyy</video>
                    </div>
                </div>
             </div>
        </div>

        
    );
  }
}

export default MainChat;
