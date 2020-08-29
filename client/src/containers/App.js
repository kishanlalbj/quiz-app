import React from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Arena from "./Arena/Arena";
import Result from "./Result/Result";

function App() {
	return (
		<React.Fragment>
			<Header></Header>

			<Container className="moveTop">
				<Route exact path="/" component={Home} />
				<Route exact path="/quiz/:id" component={Arena} />
				<Route exact path="/quiz/:id/result" component={Result} />
			</Container>
		</React.Fragment>
	);
}

export default App;
