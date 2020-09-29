import React from "react";
import { connect } from "react-redux";

const Result = (props) => {
	return (
		<div>
			<h1>Result</h1>
			{props.result.passed ? (
				<>
					<p>
						Congrats, You passed the quiz with{" "}
						<span style={{ fontSize: "250%" }}>{props.result.percentage}</span>{" "}
						%
					</p>
				</>
			) : (
				<>
					You got{" "}
					<span style={{ fontSize: "250%" }}>{props.result.percentage}</span> %.
					Better Luck Next Time
				</>
			)}
		</div>
	);
};
const mapStateToProps = (state) => ({
	result: state.quizStore.result,
});

export default connect(mapStateToProps, null)(Result);
