// components/PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;