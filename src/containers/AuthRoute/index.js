import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component, isAuthenticated, ...attrs }) => (
  <Route 
    {...attrs} 
    render={props => ( isAuthenticated ? (
      component={component}
    ) : 
    (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }} 
      />
    )
    )} 
  />
);

export default AuthRoute;