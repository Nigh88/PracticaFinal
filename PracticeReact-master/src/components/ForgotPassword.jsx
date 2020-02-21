import React, { Component } from 'react';
import {sendEmail } from '../Services/userServices';
import { withRouter } from 'react-router-dom';

class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
        };
    }

   onInputChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    recoverPassword = event => {
        event.preventDefault();
        const { email } = this.state;
        sendEmail(email)
        .then(res => {
            this.props.history.push('/Home');
        },
        error => {
           error.toString()
        });
    }

    render() {
        const { email} = this.state;
        const cardStyle = {
            margin: '1rem'
        };

        return(
            <React.Fragment>
                <div className="container" style={cardStyle}>
                    <form onSubmit={this.recoverPassword}>       

                        <div className="form-group">
                            <label for="email">Email</label>
                            <input
                            className="form-control"
                            id="email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={this.onInputChange}
                            placeholder="Write your email"
                            />
                        </div>
                
                        <button type='submit' className="btn btn-primary">Send email</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(ForgotPassword); 