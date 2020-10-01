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

class App extends Component {
	constructor(props) {
		super(props);
		if (localStorage.jwtToken) {
			setAuthHeader(localStorage.getItem("jwtToken"));
			const decoded = jwt_decode(localStorage.jwtToken);
			console.log(decoded);
			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime) {
				this.props.history.push("/");
			} else {
				if (decoded.role === "admin") this.props.history.push("/admin");
				else this.props.history.push("/home");
			}
		} else {
			this.props.history.push("/");
		}
	}
	render() {
		return (
			<React.Fragment>
				<Header></Header>

				<Route path="/admin" component={Admin} />

				<Container className="moveTop">
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/home" component={Home} />
						<Route exact path="/quiz/:id" component={Arena} />
						<Route exact path="/quiz/:id/result" component={Result} />
					</Switch>
				</Container>
			</React.Fragment>
		);
	}
}

export default withRouter(App);
