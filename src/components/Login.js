import React, { Component } from 'react';
import '../css/login.css';


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
    }



    render() {
        const {nickname, error} = this.state;
        return (
            <div className="container">
                <div id="form-login">
                    <form onSubmit={this.handleSubmit} className="login-form col-md-4 col-md-offset-4 centered" id="form-login" >
                        <div className="form-group">
                                <label htmlFor="nickname">Nickname</label>
                                <input type="text" name="nickname" className="form-control" placeholder="Enter a username" />
                                <div className="error">{error ? error:null}</div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;