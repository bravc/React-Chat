import React, { Component } from 'react';

import '../css/login.css';

class MainChat extends Component {

  constructor(props){
    super(props);

    this.state = {
      stream: null,
      error: ""
    };
}

  componentWillMount() {
		this.getVideo();
	}

  //get video stream
  getVideo = () => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((stream) => {
        console.log('Got it');
        this.setState({stream: stream});
      })
      .catch((err) => {
        this.setState({error: 'No devices found!'});
        console.log(err);
      })
  }



  render() {
    const { stream, error } = this.state;
    return (

      <div className="container">
        <div className="card card-container">
        
          <video id={stream}></video>
          <div className="error">{error}</div>
        </div>
      </div>
      
    );
  }
}

export default MainChat;
