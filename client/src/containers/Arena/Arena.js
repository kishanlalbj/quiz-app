import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuestions, submitQuiz } from "../../store/actions/quizActions";
import { Spinner } from "react-bootstrap";
import QuestionPanel from "../../components/QuestionPanel/QuestionPanel";
import Timer from "../../components/Timer/Timer";
import axios from "axios";

class Arena extends Component {
  state = {
    questions: this.props.questions,
    quizName: "",
    currQuestionIndex: 0,
    answers: [],
    time: 0,
    submitted: false,
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    return {
      questions: nextProps.questions,
    };
  }

  async componentDidMount() {
    this.props.getQuestions(this.props.match.params.id);
    let response = await axios.get(
      `/api/quiz/${this.props.match.params.id}/time`
    );

    this.setState({
      time: response.data.time,
      quizName: response.data.quizName,
    });
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
    alert("Submitting Quiz");
    this.setState({
      submitted: true,
    });
    this.props.submitQuiz(this.props.match.params.id, this.state.answers);
    this.props.history.replace(`/quiz/${this.props.match.params.id}/result`);
  };

  render() {
    const { loader } = this.props;
    const { submitted, time, quizName } = this.state;
    const currentQuestion = this.state.questions[this.state.currQuestionIndex];
    const hidePreviousButton = this.state.currQuestionIndex === 0;
    const hideNextButton =
      this.state.currQuestionIndex === this.state.questions.length - 1;
    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Quiz: {quizName}</h4>
          {time > 0 ? (
            <Timer
              minutes={time}
              onTimeUp={this.submitQuiz}
              submitted={submitted}
            ></Timer>
          ) : null}
        </div>
        {this.state.currQuestionIndex + 1} of {this.state.questions.length}
        {loader ? (
          <div className="centering">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : this.state.questions.length > 0 ? (
          <QuestionPanel
            questionId={currentQuestion._id}
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
