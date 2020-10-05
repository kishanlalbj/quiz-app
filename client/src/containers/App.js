import React, { Component } from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Arena from "./Arena/Arena";
import Result from "./Result/Result";
import Admin from "./Admin/Admin";
import Login from "./Login/Login";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Registration from "./Registration/Registration";

import { AUTH_TYPES } from "../store/types/authTypes";
import { checkAuth, getUserFromToken } from "../utils/checkAuth";

class App extends Component {
	constructor(props) {
		super(props);

		let isAuth = checkAuth();
		if (isAuth) {
			this.setState({ isAuthenticated: isAuth });
			const user = getUserFromToken();
			this.props.setUser(user);
			if (user.role === "admin") this.props.history.push("/admin");
			else this.props.history.push("/home");
		} else {
			this.props.history.push("/");
		}
	}

	component;
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
