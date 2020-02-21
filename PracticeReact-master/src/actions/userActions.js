import * as types from './types';
import * as userServices from '../Services/userServices';
import {history} from '../Services/history'

export const login = ( user ) => {
    return dispatch => {
        dispatch(loginRequest({ user }));
    
        userServices.loginUser(user)
        .then(
            res => {
                dispatch(loginSuccess(user));
                history.push('/userHome');
                user.token = res.token;
                localStorage.setItem('user', JSON.stringify({user}))
            },
            error => {
                dispatch(loginError(error.toString()))
            }
        );
    };
};

export const loginRequest = (user) => ({type: types.LOGIN_REQUEST, user});
export const loginSuccess = (user) => ({type: types.LOGIN_SUCCESS, user});
export const loginError = (error) => ({type: types.LOGIN_ERROR, error});


export const register = (user)=> {
    return dispatch => {
        dispatch(registerRequest())
        userServices.registerUser(user)
        .then(
            userParams => { 
                dispatch(registerSuccess());
                history.push('/login');
            },
            error => {
                dispatch(registerError(error.toString()));
            }
        );
    }
};  


export const registerRequest = () => ({type: types.REGISTER_REQUEST});
export const registerSuccess = () => ({type: types.REGISTER_SUCCESS});
export const registerError= error => ({type: types.REGISTER_ERROR, error});