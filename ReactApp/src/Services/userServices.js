import API from './config';
import axios from 'axios';
// import * as types from '../actions/types'

// export function setUser(user) {
//   return {
//     type: types.SET_USER,
//     user
//   };
// }

 export function authHeader() {
  let token = localStorage.getItem('token');

  if (token) {
      return { 'Authorization': 'Bearer ' + token };
  } else {
      return {};
  }
}

export const loginUser = (user) => {
    return fetch(`${API}/api/login`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user})
    })
    // .then(setUser(user))
    .then(res => res.json())
}

export const isLogin = () => {
  let token = localStorage.getItem('token');

  if (token) {
      return true;
  }

  return false;
}

export const logoutUser = () => {
  localStorage.removeItem('user');
}


export const registerUser = (user) => {
  return fetch(`${API}/api/user/register`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user})
  })
  .then(res => res.json())
};

export const userTaken = user => {
    return fetch(`${API}/api/user/${user.id}`, {
        method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
      }
)};

export const getUser = () => {
  return fetch(`${API}/api/profile/`, {
    method: 'GET',
    headers: {...authHeader() },
  })
  .then(res => res.json())
};

export const updateUser = user => {
  return fetch(`${API}/api/user/${user.id}`, {
    method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
  }
)};

export const sendEmail = email => {
  return fetch(`${API}/api/forgotPassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email})
  })
  .then(res => res.json())
  };

  export const resetPassword = (password, token) => {
      return fetch(`${API}/api/reset`, {
        method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({password: password, token: token})
      }
    )};