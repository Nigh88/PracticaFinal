import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Validator from 'validator';
import User from '../models/user';
import UserContext from '../utils/user';
import { getUser } from '../Services/userServices';

class Profile extends Component {
    constructor(props) {
        super(props);
        const { user } = props;
        console.log(localStorage)
         this.state = {        
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
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

    // onSubmit = (event) => {
    //     event.preventDefault();

    //     if (!this.state.name || this.state.name.trim().length < 3) {
    //         alert("Name is too short. At least 3 characters");
    //         return;
    //     }

    //     if (!this.state.surname || this.state.surname.trim().length < 3) {
    //         alert("Surmane is too short. At least 3 characters")
    //     }

    //     if (!Validator.isEmail(this.state.email)) {
    //         alert('Invalid email')
    //     }

    //     this.props.register(this.state)
        
    // }

    render() {
        const { name, surname, email, password} = this.state;
        const {userExists} = this.props;
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
                            userExists={userExists}
                            placeholder="Write your name"
                            />
                        </div>

                        <div className="form-group">
                            <label for="surname">Surname</label>
                            <input
                            className="form-control"
                            id="surname"
                            name="surname"
                            type="text"
                            value={surname}
                            onChange={this.onInputChange}
                            placeholder="Write your surname"
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
                            userExists={userExists}
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

                        <button type='submit' className="btn btn-primary">Update</button>
                        <button type='submit' className="btn btn-primary">Logout</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

Profile.contextType = UserContext;
export default withRouter(Profile)