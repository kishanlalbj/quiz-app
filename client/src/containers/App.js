import React, { Component } from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import { Route, Switch, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Arena from "./Arena/Arena";
import Result from "./Result/Result";
import Admin from "./Admin/Admin";
import Login from "./Login/Login";
import setAuthHeader from "../utils/api";
import { connect } from "react-redux";
import { AUTH_TYPES } from "../store/types/authTypes";
import ProtectedRoute from "../utils/ProtectedRoute";
import Registration from "./Registration/Registration";

class App extends Component {
  constructor(props) {
    super(props);
    if (localStorage.jwtToken) {
      const token = localStorage.getItem("jwtToken");
      setAuthHeader(token);
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.props.history.push("/");
      } else {
        if (decoded.role === "admin") this.props.history.push("/admin");
        else this.props.history.push("/home");
        this.props.setUser(decoded);
      }
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header></Header>

        <Container className="moveTop">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Registration} />
            <ProtectedRoute path="/admin" component={Admin} />
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/quiz/:id" component={Arena} />
            <ProtectedRoute exact path="/quiz/:id/result" component={Result} />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) =>
    dispatch({ type: AUTH_TYPES.SET_USER_DETAILS, payload: user }),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
