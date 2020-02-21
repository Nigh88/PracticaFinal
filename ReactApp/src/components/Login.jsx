import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {loginUser} from '../Services/userServices'
import UserContext from '../utils/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    email: '',
    password: '',
    token: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onInputChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const user = this.state;
    
    loginUser(user)
    .then(
        res => {
            this.props.history.push('/userHome');
            localStorage.setItem('token', (res.token))
        },
        error => {
           error.toString()
        }
    );
  }
  

  render() {
    const {email, password} = this.state;
    const cardStyle = {
      margin: '1rem'
    };

    return (
      <React.Fragment>
      <div className="container" style={cardStyle}>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <label for="email">User</label>
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
                  placeholder="Password"
                  />
              </div>

              <div class="forgot_passwprd">
                <a class="recover_password" href='/forgot_password'>Did you forget your password?</a>
              </div>

              <button type='submit' className="btn btn-primary">Login</button>
          </form>
      </div>
  </React.Fragment>
    )
  }
}

Login.contextType = UserContext;
export default withRouter(Login);