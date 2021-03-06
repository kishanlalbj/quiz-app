import React from "react";
import Quiz from "./Quiz";
import { Col } from "react-bootstrap";

const QuizList = (props) => {
	return (
		<React.Fragment>
			{props.quizzes.map((quiz) => (
				<Col md={4} xs={12} sm={6} key={quiz._id} className="moveTop">
					<Quiz
						key={quiz._id}
						id={quiz._id}
						category={quiz.category}
						name={quiz.quizName}
						onClickHandler={props.onClickHandler}
					></Quiz>
				</Col>
			))}
		</React.Fragment>
	);
};

export default QuizList;
