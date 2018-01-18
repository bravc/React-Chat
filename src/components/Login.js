import React, { Component } from 'react';
import '../css/login.css';


class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username:"",
            error:""
        };
    }


    
    render() {
        const {username, error} = this.state;
        return (
            <div className="container">
                <h1 className="welcome text-center">Welcome to Hell </h1>
                    <div className="card card-container">
                        <h2 className='login_title text-center'>Login</h2>
                            <form action="/login" method="POST" className="form-signin">
                                <span id="reauth-email" className="reauth-email"></span>
                                <p className="input_title">Username</p>
                                <input ref="Username" type="text" id="username" className="login_box" placeholder="ex: coolUserNme" required autoFocus></input>
                                <button className="btn btn-lg btn-primary" type="submit">Login</button>
                            </form>
                    </div>
            </div>
        );
    }
}

export default Login;