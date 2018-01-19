import React, { Component } from 'react';

import '../css/login.css';

class MainChat extends Component {

  constructor(props){
    super(props);

    this.state = {
      stream: null,
      error: "",
      playing: false
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

  videoOn = () => {
    const { stream, playing } = this.state;
    const { video, on, card } = this.refs;


    if(playing){
        video.pause();
        stream.getTracks()[0].stop();
        video.stop;
        video.srcObject = null;
    
        on.disabled = false;

        this.setState({playing: false})


    }else{
        video.srcObject = stream;

        card.setAttribute('width', video.videoWidth);
        card.setAttribute('height', video.videoHeight);
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
        <div className="card card-container" id="video" ref="card">
        
          <video ref="video">Waiting for video....</video>
          <div className="col-mid-4">
                <button className="btn btn-lg btn-primary" id="vid-btn" ref="on" onClick={this.videoOn}> Turn on Camera </button>
            </div>
          <div className="error">{error}</div>

        </div>
      </div>
      
    );
  }
}

export default MainChat;
