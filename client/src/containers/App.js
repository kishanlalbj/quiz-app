import React from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Arena from "./Arena/Arena";
import Result from "./Result/Result";
import Admin from "./Admin/Admin";
import Login from "./Login/Login";

function App() {
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

export default App;
