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



    handleSubmit = (e) => {
        e.preventDefault();
        const { username } = this.state;
    }
    



    render() {
        const {username, error} = this.state;
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