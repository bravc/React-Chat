import React, { Component } from 'react';
import '../css/login.css';
import {ADD_USER} from '../constants';


class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            nickname:"",
            error:""
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {socket} = this.props;
        const { username } = this.state;
        socket.emit(ADD_USER, username, this.addUser);
    }



    render() {
        const {nickname, error} = this.state;
        return (
            <div className="container">
                <div id="form-login">
                    <form onSubmit={this.handleSubmit} className="login-form col-md-4 col-md-offset-4" id="form-login" >
                        <div className="form-group rounded">
                                <label htmlFor="username"></label>
                                <input type="text" name="username" className="form-control" placeholder="Enter a username" />
                                <div className="error">{error ? error:null}</div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;