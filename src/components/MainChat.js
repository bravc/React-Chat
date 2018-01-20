import React, { Component } from 'react';

const { ADD_USER } = require('../constants');

// import '../css/login.css';

class MainChat extends Component {

  constructor(props){
    super(props);

    this.state = {
      stream: null,
      error: "",
      playing: false,
      users: []
    };
}

  componentWillMount() {
        this.getVideo();
        this.getUsers();
	}

  //get video stream
  getVideo = () => {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then((stream) => {
        console.log('Got it');
        this.setState({stream: stream});
      })
      .catch((err) => {
        this.setState({error: 'No devices found!'});
        console.log(err);
      })
  }

  getUsers = () => {
      const { socket } = this.props;
      const { userList } = this.refs;

      socket.on(ADD_USER, (user) => {
          let { users } = this.state;
          users.push(user);
          this.setState({users: users});
      });
  }

  videoOn = () => {
    this.getVideo();
    const { stream, playing } = this.state;
    const { video, on, card } = this.refs;


    if(playing){
        video.pause();
        video.stop;
        video.srcObject = null;
        stream.getTracks()[0].stop();

    
        this.setState({playing: false})


    }else{
        video.srcObject = stream;

        card.setAttribute('width', video.videoWidth);
        card.setAttribute('height', video.videoHeight);
      
        video.play();

        this.setState({playing: true})
    }
  }





  render() {
    const { error } = this.state;

    return (

      <div className="container">
        <div className="row">
            <div className="col-mid">
                <div className="card card-container" id="video" ref="card">
                <video ref="video" id="vid-screen" >Waiting for video....</video>
                    <button className="btn btn-lg btn-primary" id="vid-btn" ref="on" onClick={this.videoOn}> Turn on Camera </button>
                <div className="error">{error}</div>
                </div>
            </div>


            <div className="col-mid">
                <div className="card card-container"> 
                    <video ref="peerVideo" id="vid-screen" >Waiting for video....</video>
                    <div className="error">{error}</div>
                </div>
            </div>

            <div className="col-mid">
                <div> 
                  <ul className="list-group" ref="userList">  
                    {this.state.users.map(function(user){
                        return (<li className="list-group-item">{user.name}</li>)
                    })}

                  </ul>
                </div>
            </div>
        </div>
      </div>
      
    );
  }
}

export default MainChat;
