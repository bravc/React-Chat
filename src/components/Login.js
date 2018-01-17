import React, { Component } from 'react';


class Login extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="login-form">
                
                    <label htmlFor="nickname">
                        <h2>Nickname? </h2>
                    </label>
                
                </form>
            </div>
        );
    }
}

export default Login;