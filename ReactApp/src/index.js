import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Switch} from 'react-router-dom';
import { history } from './Services/history';
import UserContext from './utils/user';
import PrivateRoute from './Services/privateRoute';
import PublicRoute from './Services/publicRoute';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserHome from './UserComponents/UserHome';
import Profile from './UserComponents/Profile';
import CreateModifi from './components/CreateModifi';
import './index.css';
import Advert from './components/Advert';
import { createAdvert, updateAdvert } from './Services/advertServices';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './components/ForgotPassword';
import Reset from  './components/Reset';

// import Login2 from './components/MOD';

export default class App extends Component{
  constructor(props) {
    super(props);
    const userData = localStorage.getItem('user');
    if (userData) {
      var user = JSON.parse(userData)
      this.state = {
        name: user.name,
        surname: user.surname,
      };
    }
    else{
      // props.history.push('/Register')
    }
  }

handleRegister = (user) => {
  this.setState({
    name: user.name,
    surname: user.surname,
    email: user.email,
  });
};

handleLogin = (user) => {
  this.setState({
    email: user.email,
    token: user.token
  });
};

handleCreate = (advert) => {
  createAdvert(advert)
}

handleUpdate = (advert, _id) => {
  updateAdvert(advert, _id)
}

  render() {
    return(
      <UserContext.Provider value={this.state}>
      <Router history={history}>
        <Navbar/>    
        <Switch>
          <PublicRoute restricted={false} path='/register'>
            <Register onRegister={this.handleRegister} />
          </PublicRoute>
          <PublicRoute restricted={false} path='/login'>
            <Login onLogin={this.handleLogin} />
          </PublicRoute>
          {/* <PublicRoute restricted={false} path='/Login2' component={Login2} /> */}
          <PublicRoute restricted={false} path='/Advert/:id' component={Advert} />
          <PublicRoute restricted={false} path='/Home' component={Home} />
          <PublicRoute restricted={false} path='/reset/:token' component={Reset} />
          <PrivateRoute  path='/userHome' component={UserHome} />
          <PrivateRoute  path='/profile' component={Profile} />
          <PrivateRoute  path='/forgot_password' component={ForgotPassword} />
          <PrivateRoute  path='/Create'>
            <CreateModifi onSubmit={this.handleCreate}/>
          </PrivateRoute>
          <PrivateRoute  path='/Update/:id'>
            <CreateModifi onSubmit={this.handleUpdate}/>
          </PrivateRoute>
        </Switch>
      </Router>
      </UserContext.Provider>
    ) 
  };
}

render(<App />, document.getElementById('root'));