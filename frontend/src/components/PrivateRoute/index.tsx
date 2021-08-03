import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateRoute = ({ component: Component, roles = null, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      // get token
      const token = 'fake';
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
