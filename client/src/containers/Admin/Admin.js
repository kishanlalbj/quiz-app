import React from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import QuizTable from "../../components/Quiz/QuizTable";
import NewQuiz from "../../components/NewQuiz/NewQuiz";

const Admin = (props) => {
	return (
		<React.Fragment>
			<Container fluid>
				<Row style={{ height: "93vh" }}>
					<Col md={12} style={{ backgroundColor: "#f5f6fa" }}>
						<Switch>
							<Route exact path={`/admin`} component={QuizTable}></Route>
							<Route exact path={`/admin/new-quiz`} component={NewQuiz}></Route>
						</Switch>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
};

export default Admin;
