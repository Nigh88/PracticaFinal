import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import UserContext from '../utils/user';
import { resetPassword } from '../Services/userServices';

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordConfirmation: '',
            token:''
        } 
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    setValues = (event) => {
        this.setState({tags:event[0].label});
      };

    onSubmit = (event) => {
        event.preventDefault();
        const {token} = this.props.match.params
    //     const { onSubmit = () => {} } = this.props;

    //     this.props.form.validateFields((err, values) => {
    //         if (err) return;
    //         const { match = {} } = this.props;
    //         const { params = {} } = match;
    //         const token = params.token;
    //         onSubmit({
    //         ...values,
    //         token
    //     });
    // });
        const { password, passwordConfirmation} = this.state;
        if (password !== passwordConfirmation) {
            alert("Password and password confirmation are not the same")
        } else {
            resetPassword(password, token)
        }
    }

    render() {
        const { password, passwordConfirmation} = this.state;
        const cardStyle = {
            margin: '1rem'
          };

        return(
            <React.Fragment>
                <div className="container" style={cardStyle}>
                    <form onSubmit={this.onSubmit}>
                      
                        <div className="form-group">
                            <label for="password">New Password</label>
                            <input
                            className="form-control"
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.onInputChange}
                            placeholder="Write your new password"
                            />
                        </div>

                        <div className="form-group">
                            <label for="passwordConfirmation">New Password Confirmation</label>
                            <input
                            className="form-control"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={this.onInputChange}
                            placeholder="New password confirmation"
                            />
                        </div>

                        <button type='submit' className="btn btn-primary">Confirm</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

Reset.contextType = UserContext;
export default withRouter(Reset); 
