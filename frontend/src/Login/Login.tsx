import React, { Component } from 'react';

interface PasswordState {
    password: string
}

class Login extends Component<{}, PasswordState> {

    constructor(props: any) {
        super(props);
        this.state = { password: '' }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            'password': (event.target as HTMLInputElement).value
        });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        var requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: this.state.password })
        }

        fetch('/api/login', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 200) {
                console.log('Correct Password');
                localStorage.setItem('login_token', res.token);
                // Reload
            } else {
                console.log('Incorrect Password');
                // Try again
            }
        });

        this.setState({
            password: ''
        });
    }

    render() {
        return (
            <div className="Login">
                <h1>Please login to access the Raspberry Pi</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Admin Password</label>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
}

export default Login;