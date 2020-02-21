import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Validator from 'validator';
import UserContext from '../utils/user';
import axios from 'axios';
import API from '../Services/config';
import Select from 'react-dropdown-select';
import {registerUser} from '../Services/userServices'



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
        } 
    }

    // userExists(event) {
    //     const { name, value } = event.target;
    //     if (value !== '') {
    //       this.props.userTaken(value).then(res => {
    //         let errors = this.state.errors;
    //         let invalid;
    //         if (res.data.user) {
    //           errors[name] = 'There is already a user with the name: ' + name;
    //           invalid = true;
    //         } else {
    //           errors[name] = '';
    //           invalid = false;
    //         }
    //         this.setState({ errors, invalid });
    //       });
    //     }
    // }

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

        if (!this.state.surname || this.state.surname.trim().length < 3) {
            alert("Surmane is too short. At least 3 characters")
            return;
        }

        if (!Validator.isEmail(this.state.email)) {
            alert('Invalid email')
            return;
        }

        registerUser(user)
        .then(
            res => { 
                console.log(res)
                if(res.success){
                this.props.onRegister({
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    }); 
                    this.props.history.push('/login');
                }  
            }
        )
    }

    // componentWillMount() {    
    //     searchTags().then(tags => {
    //         var i;
    //         var tempTags = [];
    //         for (i = 0; i < tags.length; i++) {
    //             tempTags[i] = {label: tags[i], value: tags[i]}
    //         }
    //         this.setState (
    //             { options : tempTags }
    //         )
    //     });
    // }

    // onSubmit = async(event) => {
    //     event.preventDefault();
    //     const {name, surname, email, password }= this.state;

    //     if (password === '' || email === '') {
    //         this.setState({ error: true });
    //     } 

    //     if (!this.state.name || this.state.name.trim().length < 3) {
    //         alert("Name is too short. At least 3 characters");
    //         return;
    //     }

    //     if (!this.state.surname || this.state.surname.trim().length < 3) {
    //         alert("Surmane is too short. At least 3 characters")
    //     }

    //     if (!Validator.isEmail(this.state.email)) {
    //         alert('Invalid email')
    //     } else {
    //         try {
    //             const response = await axios.post(`${API}/api/user/register`, {
    //                 name, surname, email, password
    //             });
    //             this.setState({
    //                 serverRes: response.data.message,
    //                 error: false
    //             });
    //         } catch (error) {
    //             console.error(error.response.data);
    //             if (error.response.data === 'This email or user is already in use'){
    //                 this.setState({
    //                     error: true
    //                 });
    //             }
    //         }
    //     };  
    // }

    render() {
        const { name, surname, email, password} = this.state;
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