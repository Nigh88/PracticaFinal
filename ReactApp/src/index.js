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
import Profile from './UserComponents/Profile';
import myAdverts from './UserComponents/myAdverts';
import CreateModifi from './components/CreateModifi';
import './index.css';
import Advert from './components/Advert';
import { createAdvert, updateAdvert } from './Services/advertServices';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './components/ForgotPassword';
import Reset from  './components/Reset';

export default class App extends Component{
  constructor(props) {
    super(props);
    const userData = localStorage.getItem('user');
    if (userData) {
      var user = JSON.parse(userData)
      this.state = {
        name: user.name,
      };
    }
    else{
      
    }
  }

handleRegister = (user) => {
  this.setState({
    name: user.name,
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
          <PublicRoute restricted={false} path='/Advert/:id' component={Advert} />
          <PublicRoute restricted={false} path='/Home' component={Home} />
          <PublicRoute restricted={false} path='/reset/:token' component={Reset} />
          <PrivateRoute  path='/adverts/:name' component={myAdverts} />
          <PrivateRoute  path='/profile' component={Profile} />
          <PrivateRoute  path='/profile/update/:id'>
            <CreateModifi onSubmit={this.handleUpdate}/>
          </PrivateRoute>
          <PublicRoute restricted={false} path='/forgot_password' component={ForgotPassword} />
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