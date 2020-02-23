import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Validator from 'validator';
import UserContext from '../utils/user';
import { getUser, updateUser, logoutUser, deleteAccount} from '../Services/userServices';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
        }
        getUser()
        .then(res => {
            this.setState ({ 
            name: res.user.name,
            email: res.user.email,
            })
        });
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

        updateUser(user)
        .then(
            res => {
                if(res.success){
                this.props.onSubmit({
                    name: this.state.name,
                    email: this.state.email,
                    }); 
                    this.props.history.push('/Profile');
                }  
            }
        )  
    }

    logout = (event) => {
        event.preventDefault();
        logoutUser()
        this.props.history.push('/login');
    }

    render() {
        const { name, email} = this.state;
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

                        <button type='submit' className="btn btn-primary">Update</button>
                        <button type='button' className="btn btn-secondary" onClick={this.logout}>Logout</button>
                        <div class="delete">
                            <a class="deleteAccount" href='/Home' onClick={this.deleteAccount}>Delete this account</a>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

Profile.contextType = UserContext;
export default withRouter(Profile)