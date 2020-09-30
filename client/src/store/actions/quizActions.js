import { QUIZ } from "../types/quizTypes";
import axios from "axios";

export const getQuizzes = () => (dispatch) => {
	dispatch(setLoader(true));

	axios
		.get("/api/quiz/all")

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
	axios.get(`/api/questions/${quizId}`).then((data) => {
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

	axios
		.post(`/api/quiz/${quizId}/submit`, {
			data: answers,
		})
		.then((data) => {
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
