import React from "react";
import { connect } from "react-redux";

const Result = (props) => {
	return (
		<div>
			<h1>Result</h1>
			<div className="centering">
				You got <h1> &nbsp;{props.points} &nbsp; </h1> points
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	points: state.quizStore.points,
});

export default connect(mapStateToProps, null)(Result);
