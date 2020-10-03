import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuth } from "../../utils/checkAuth";

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) =>
          checkAuth() ? <Component {...props}></Component> : <Redirect to="/" />
        }
      ></Route>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.authStore.authenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
