import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLogin} from './userServices';


const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
            <Component {...props}/>
            :<Redirect to='/register'/>
        )}/>
    );
};

export default PrivateRoute;

// import { authenticationService } from '@/_services';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => {
//         const currentUser = authenticationService.currentUserValue;
//         if (!currentUser) {
//             // not logged in so redirect to login page with the return url
//             return <Redirect to={{ pathname: '/register', state: { from: props.location } }} />
//         }

//         // authorised so return component
//         return <Component {...props} />
//     }} />
// )

// export default PrivateRoute;