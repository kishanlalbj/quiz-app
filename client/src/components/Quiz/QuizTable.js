import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ListGroup, Container, Button } from "react-bootstrap";
import { getQuizzes } from "../../store/actions/quizActions";

const QuizTable = (props) => {
	useEffect(() => {
		props.getQuizzes();
	}, []);

	return (
		<React.Fragment>
			<Container>
				<br></br>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<h4> Quizzes </h4>
					<Button onClick={() => props.history.push("/admin/new-quiz")}>
						New Quiz
					</Button>
				</div>
				<br></br>

				<ListGroup>
					{props.quizzes.map((quiz) => {
						return <ListGroup.Item key={quiz.id}>{quiz.name}</ListGroup.Item>;
					})}
				</ListGroup>
			</Container>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	quizzes: state.quizStore.quiz,
});

const mapDispatchToProps = (dispatch) => ({
	getQuizzes: () => dispatch(getQuizzes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizTable);
