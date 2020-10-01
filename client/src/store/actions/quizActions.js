import { QUIZ } from "../types/quizTypes";
import axios from "axios";

export const getQuizzes = () => (dispatch) => {
	dispatch(setLoader(true));

	axios
		.get("/api/quiz/all")

		.then((response) => {
			dispatch(setLoader(false));

			return dispatch({
				type: QUIZ.GET_QUIZ,
				payload: response.data,
			});
		});
};

export const getQuestions = (quizId) => (dispatch) => {
	dispatch(setLoader(true));
	axios.get(`/api/questions/${quizId}`).then((response) => {
		dispatch(setLoader(false));
		return dispatch({
			type: QUIZ.GET_QUESTIONS,
			payload: response.data,
		});
	});
};

export const submitQuiz = (quizId, answers) => (dispatch) => {
	dispatch(setLoader(true));

	console.log(answers);

	axios
		.post(`/api/quiz/${quizId}/submit`, answers)
		.then((response) => {
			dispatch({
				type: QUIZ.CURRENT_QUIZ_RESULT,
				payload: response.data,
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
