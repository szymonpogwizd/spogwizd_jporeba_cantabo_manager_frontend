import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
    const isLoggedIn = localStorage.getItem('isLogged') === 'true';

    return (
      <Route {...rest}>
        {isLoggedIn ? children : <Navigate to="/login" />}
      </Route>
    );
}

export default PrivateRoute;
