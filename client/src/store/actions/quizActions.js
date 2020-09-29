const { QUIZ } = require("../types/quizTypes");

export const getQuizzes = () => (dispatch) => {
	dispatch(setLoader(true));
	fetch("/api/quiz/all")
		.then((resp) => resp.json())
		.then((data) => {
			dispatch(setLoader(false));

			return dispatch({
				type: QUIZ.GET_QUIZ,
				payload: data,
			});
		});
};

export const getQuestions = (quizId) => (dispatch) => {
	dispatch(setLoader(true));
	fetch(`/api/questions/${quizId}`)
		.then((resp) => resp.json())
		.then((data) => {
			console.log(data);
			dispatch(setLoader(false));
			return dispatch({
				type: QUIZ.GET_QUESTIONS,
				payload: data,
			});
		});
};

export const submitQuiz = (quizId, answers) => (dispatch) => {
	dispatch(setLoader(true));
	console.log(answers);
	fetch(`/api/quiz/${quizId}/submit`, {
		method: "POST",
		node: "cors",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(answers),
	})
		.then((resp) => resp.json())
		.then((data) => {
			console.log(data);
			dispatch({
				type: QUIZ.CURRENT_QUIZ_RESULT,
				payload: data,
			});
			dispatch(setLoader(false));
		})
		.catch((err) => {
			console.log("error", err);
		});
};

export const setLoader = (status) => (dispatch) => {
	return dispatch({
		type: QUIZ.SET_LOADER,
		payload: status,
	});
};
