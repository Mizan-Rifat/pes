import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthProtectedRoute = ({
  component: Component,
  panel,
  ...rest
}) => {

    const {user} = useSelector(state => state.sessionUser)
    
  return (
    <Route
      {...rest}
      render={props => {

        if (Object.keys(user).length > 0 ) {

          return <Component {...props} panel={panel}/>;

        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                  message:'You have to be logged in to view this page...'
                }
              }}
            />
          );
        }
      }}
    />
  );
};
