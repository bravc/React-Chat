import React, { Component } from 'react';

const { ADD_USER } = require('../constants');




class ActiveUsers extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: {},
      userList: null
    };

    const { socket } = this.props;

    socket.on(ADD_USER, (connectedUsers) => {
      this.setState({users: connectedUsers});
      this.mapUsers();
      console.log("New user!" + connectedUsers);
    });
}



  mapUsers = () => {
    const { users } = this.state;
    const listUsers = Object.keys(users).forEach((user) => {
      console.log(user);
      return <li className="list-group-item" value={user} key={users[user].id}></li>
    });
    console.log(listUsers);

    this.setState({userList: listUsers});
  }




// (<li className="list-group-item" key={i}> user</li>)





  render() {
    const { users, userList } = this.state;


    return (
      <div>
        <ul className="list-group" onChange={this.mapUsers}>{userList} </ul>
      </div>
    );
  }
}

export default ActiveUsers;
