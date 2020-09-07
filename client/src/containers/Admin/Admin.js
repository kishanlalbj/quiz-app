import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import SideNav from "../../components/SideNav/SideNav";
import QuizTable from "../../components/Quiz/QuizTable";
import NewQuiz from "../../components/NewQuiz/NewQuiz";

const Admin = (props) => {
	const sideNavItems = ["Quizzes", "New Quiz", "Users"];

	const [page, setPage] = useState(sideNavItems[0]);

	const onSelectPageHandler = (newPage) => {
		console.log("Change", newPage);
		setPage(newPage.replace(" ", "-"));
	};

	useEffect(() => {
		props.history.push(`/admin/${page.toLowerCase()}`);
	}, [page]);

	return (
		<React.Fragment>
			<Container fluid>
				<Row style={{ height: "93vh" }}>
					{/* <Col md={2}>
						<SideNav
							items={sideNavItems}
							onSelectItem={onSelectPageHandler}
						></SideNav>
					</Col> */}

					<Col md={12} style={{ backgroundColor: "#f5f6fa" }}>
						<Switch>
							<Route
								exact
								path={`/admin/quizzes`}
								component={QuizTable}
							></Route>
							<Route exact path={`/admin/new-quiz`} component={NewQuiz}></Route>
							{/* <Route
								path={`/admin/${page.toLowerCase()}`}
								render={() => <h1>{page}</h1>}
							></Route> */}
						</Switch>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
};

export default Admin;
