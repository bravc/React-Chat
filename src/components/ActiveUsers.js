import React, { Component } from 'react';

const { ADD_USER } = require('../constants');


class ActiveUsers extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: {}
    };

    const { socket } = this.props;

    socket.on(ADD_USER, (connectedUsers) => {
      this.setState({users: connectedUsers});
      console.log("New user!" + connectedUsers);
      
    });
}




  render() {
    const { users } = this.state;
    return (
      <div>
        <ul className="list-group">
          {Object.keys(users).forEach(function(user, i){
            console.log(user);
            
            return <li className="list-group-item" key={i}> user</li>
          })}
        </ul>
      </div>
    );
  }
}

export default ActiveUsers;
