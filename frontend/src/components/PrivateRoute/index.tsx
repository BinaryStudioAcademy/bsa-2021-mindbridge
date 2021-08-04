import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN } from '@screens/Login/constants/auth_constants';

const PrivateRoute = ({ component: Component, roles = null, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      // get token
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
