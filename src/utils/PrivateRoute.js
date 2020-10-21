import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(({ user }) => user);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth.loading && !isAuth.isAuthenticated ? (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        ) : (
          !isAuth.loading && isAuth.isAuthenticated && <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
