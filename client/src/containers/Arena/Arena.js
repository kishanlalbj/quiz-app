import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuestions, submitQuiz } from "../../store/actions/quizActions";
import { Spinner } from "react-bootstrap";
import QuestionPanel from "../../components/QuestionPanel/QuestionPanel";
import Timer from "../../components/Timer/Timer";

class Arena extends Component {
	state = {
		questions: this.props.questions,
		currQuestionIndex: 0,
		answers: [],
		submitted: false,
	};

	static getDerivedStateFromProps(nextProps, nextState) {
		return {
			questions: nextProps.questions,
		};
	}

	componentDidMount() {
		this.props.getQuestions(this.props.match.params.id);
	}

	nextQuestion = () => {
		let currQuestionIndex = this.state.currQuestionIndex;
		if (currQuestionIndex !== this.state.questions.length - 1) {
			this.setState((prevState) => ({
				currQuestionIndex: prevState.currQuestionIndex + 1,
			}));
		}
	};

	previousQuestion = () => {
		if (this.state.currQuestionIndex !== 0) {
			this.setState((prevState) => ({
				currQuestionIndex: prevState.currQuestionIndex - 1,
			}));
		}
	};

	handleCaptureAnswer = (questionId, answer) => {
		console.log("Capturing Answer", questionId, answer);

		let copy = [...this.state.answers];
		let obj = {
			questionId,
			answer,
		};

		if (copy.length === 0) {
			copy.push(obj);
			this.setState({ answers: [...copy] });
		} else {
			let newarr = copy.filter((ans) => ans.questionId !== questionId);
			newarr.push(obj);
			this.setState({ answers: [...newarr] });
		}
	};

	submitQuiz = () => {
		console.log("Submitting Quiz", this.state.answers);
		alert("Submitting Quiz");
		this.setState({
			submitted: true,
		});
		this.props.submitQuiz(this.props.match.params.id, this.state.answers);
		this.props.history.replace(`/quiz/${this.props.match.params.id}/result`);
	};

	render() {
		const { id } = this.props.match.params;
		const { loader } = this.props;
		const { submitted } = this.state;
		const currentQuestion = this.state.questions[this.state.currQuestionIndex];
		const hidePreviousButton = this.state.currQuestionIndex === 0;
		const hideNextButton =
			this.state.currQuestionIndex === this.state.questions.length - 1;

		return (
			<React.Fragment>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<h4>Quiz: {id}</h4>
					<Timer
						minutes={1}
						onTimeUp={this.submitQuiz}
						submitted={submitted}
					></Timer>
				</div>
				<br></br>
				{loader ? (
					<div className="centering">
						<Spinner animation="border" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
					</div>
				) : this.state.questions.length > 0 ? (
					<QuestionPanel
						questionId={currentQuestion.id}
						question={currentQuestion.question}
						options={currentQuestion.options}
						selectedAnswer={this.state.answers}
						captureAnswer={this.handleCaptureAnswer}
						onNext={this.nextQuestion}
						onPrevious={this.previousQuestion}
						onSubmit={this.submitQuiz}
						hidePrevious={hidePreviousButton}
						hideNext={hideNextButton}
					></QuestionPanel>
				) : null}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	questions: state.quizStore.questions,
	currentQuestionIndex: state.quizStore.currentQuestionIndex,
	loader: state.quizStore.loader,
});

const mapDispatchToProps = (dispatch) => ({
	getQuestions: (quizId) => dispatch(getQuestions(quizId)),
	submitQuiz: (quizId, answers) => dispatch(submitQuiz(quizId, answers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
