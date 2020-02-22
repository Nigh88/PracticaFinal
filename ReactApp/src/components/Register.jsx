import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Validator from 'validator';
import UserContext from '../utils/user';
import {registerUser} from '../Services/userServices'



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
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
        const user= this.state;

        if (!this.state.name || this.state.name.trim().length < 3) {
            alert("Name is too short. At least 3 characters");
            return;
        }

        if (!Validator.isEmail(this.state.email)) {
            alert('Invalid email')
            return;
        }

        registerUser(user)
        .then(
            res => { 
                if(res.success){
                this.props.onRegister({
                    name: this.state.name,
                    email: this.state.email,
                    }); 
                    this.props.history.push('/login');
                } else {
                    alert(res.error)
                }  
            }
        )
    }

    render() {
        const { name, email, password} = this.state;
        const cardStyle = {
            margin: '1rem'
          };

        return(
            <React.Fragment>
                <div className="container" style={cardStyle}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={this.onInputChange}
                            placeholder="Write your name"
                            />
                        </div>

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

                        <div className="form-group">
                            <label for="password">Password</label>
                            <input
                            className="form-control"
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.onInputChange}
                            placeholder="Write your password"
                            />
                        </div>

                        <button type='submit' className="btn btn-primary">Register</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

Register.contextType = UserContext;
export default withRouter(Register);