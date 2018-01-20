import React, { Component } from 'react';
import ActiveUsers from './ActiveUsers';

import '../css/chat.css';

class MainChat extends Component {

  constructor(props){
    super(props);

    this.state = {
      stream: null,
      error: [],
      playing: false,
      connectUser: ""
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

    onSubmit = (e) => {
        const { connectUser } = this.state;
    
        console.log(connectUser);

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
        <div className="container-fluid">
            <div className="row">
                <div className="page">
                    <div className="col-mid">
                        <div className="card">
    
                            <video className="card-img-top" ref="video">Heyyyyy</video>
                
                            <div className="card-block">
                                <p className="card-text">Make youself look pretty</p>
                                <button className="btn btn-lg btn-primary" id="vid-btn" ref="on" onClick={this.videoOn}> Turn on Camera </button>
                                <div className="error">{error}</div>


                            </div>
                        </div>
                    </div>
                    <div className="col-mid">
                        <div className="card">
                            <form className="form-group"  onSubmit={this.onSubmit}  id="form-chat">
                                <input className="form-control" ref="connectUser" onChange={this.handleChange} type="text" placeholder="Enter a user to chat with"/>
                                <div className="error">{error}</div>
                                <button className="btn btn-lg btn-primary" id="vid-btn" type="submit">Lets Chat!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    );
  }
}

export default MainChat;
