import React from "react";
import {Route, Redirect} from "react-router-dom";
import {getToken} from "../utils/api";

function PrivateRoute ({component: Component, ...props}) {
   return (
      <Route {...props} render={renderProps => {
         if (getToken()) {
            <Component {...props} />
         }

         return <Redirect to="/login" />;
      }} />
   );
}

export default PrivateRoute;