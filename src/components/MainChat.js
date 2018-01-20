import React, { Component } from 'react';
import ActiveUsers from './ActiveUsers';

import '../css/chat.css';

class MainChat extends Component {

  constructor(props){
    super(props);

    this.state = {
      stream: null,
      error: "",
      playing: false,
    };
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
        this.refs.on.disabled = true;
        console.log(err);
      })
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
        video.play();
        this.setState({playing: true})
    }
  }








  render() {
    const { error, stream } = this.state;
    const { socket } = this.props;

 


    return (

        <div className="container">
            <div className="row">
                <div className="page">
                    <div className="col-mid-3">
                        <div className="card">
    
                            <video className="card-img-top" ref="video">Heyyyyy</video>
                
                            <div className="card-block">
                                <p className="card-text">Make youself look pretty</p>
                                <button className="btn btn-lg btn-primary" id="vid-btn" ref="on" onClick={this.videoOn}> Turn on Camera </button>
                                <div className="error">{error}</div>


                            </div>
                        </div>
                    </div>
                    <div className="col-mid-3">
                        <ActiveUsers socket={socket} />
                    </div>

                    <div className="col-mid-6">
                        <form className="form-group">
                            <input className="form-control" type="text" placeholder="Enter a user to chat with"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        
    );
  }
}

export default MainChat;
