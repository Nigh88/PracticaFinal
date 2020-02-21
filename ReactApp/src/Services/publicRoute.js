import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLogin} from './userServices';

const PublicRoute = ({component: Component, restricted,  ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
            <Redirect to='/userHome'/>
            : <Component {...props}/>
        )}/>
    );
};

export default PublicRoute;