import { QUIZ } from "../types/quizTypes";

const INITIAL_STATE = {
	quiz: [],
	questions: [],
	loader: false,
	currentQuestionIndex: 0,
	result: {},
};

const quizReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case QUIZ.GET_QUIZ:
			return {
				...state,
				quiz: [...action.payload],
			};
		case QUIZ.GET_QUESTIONS:
			return {
				...state,
				questions: [...action.payload],
			};
		case QUIZ.SET_LOADER:
			return {
				...state,
				loader: action.payload,
			};
		case QUIZ.CURRENT_QUIZ_RESULT:
			return {
				...state,
				result: { ...action.payload },
			};
		default:
			return state;
	}
};

export default quizReducer;
