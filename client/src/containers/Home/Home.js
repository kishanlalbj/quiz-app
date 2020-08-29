import React, { useEffect } from "react";
import { connect } from "react-redux";
import QuizList from "../../components/Quiz/QuizList";
import { Row, Spinner } from "react-bootstrap";
import { getQuizzes } from "../../store/actions/quizActions";

const Home = (props) => {
	let { getQuizzes } = props;

	useEffect(() => {
		getQuizzes();
	}, []);

	const onClickHandler = (e, index) => {
		props.history.push("/quiz/" + index);
	};

	return (
		<React.Fragment>
			<h4>Quizzes</h4>
			{props.loader ? (
				<div className="centering">
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</div>
			) : (
				<Row style={{ height: "100%" }}>
					<QuizList quizzes={props.quiz} onClickHandler={onClickHandler} />
				</Row>
			)}
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	quiz: state.quizStore.quiz,
	loader: state.quizStore.loader,
});

const mapDispatchToProps = (dispatch) => ({
	getQuizzes: () => dispatch(getQuizzes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
