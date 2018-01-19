import React, { Component } from 'react';
import '../css/login.css';
import { USER_CONNECTED } from '../constants';


class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username:"",
            error:""
        };
    }

    setUser = ({user, nameTaken}) => {
        if(nameTaken){
            this.setState({error: "Name taken"});
        }else{
            this.setState({error: ""});
            this.props.setUser(user);
        }
    }


    onSubmit = (e) => {
        const { username } = this.state;
        const { socket } = this.props;

        socket.emit(USER_CONNECTED, username, this.setUser);

        
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({username: e.target.value});
    }



    
    render() {
        const {username, error} = this.state;
        return (
            <div className="container">
                <h1 className="welcome text-center">Welcome to Hell </h1>
                    <div className="card card-container">
                        <h2 className='login_title text-center'>Login</h2>
                            <form onSubmit={this.onSubmit} className="form-signin">
                                <span id="reauth-email" className="reauth-email"></span>
                                <p className="input_title">Username</p>
                                <input ref="Username" onChange={this.handleChange} type="text" id="username" className="login_box" placeholder="ex: coolUserNme" required autoFocus></input>
                                <button className="btn btn-lg btn-primary" type="submit">Login</button>
                            </form>
                    </div>
            </div>
        );
    }
}

export default Login;