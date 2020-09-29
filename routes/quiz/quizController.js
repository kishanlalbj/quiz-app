const Quiz = require("../../models/Quiz");

const getQuiz = async () => {
	try {
		let quizzes = await Quiz.find();
		return quizzes;
	} catch (error) {
		console.log(error);
		return error;
	}
};

const createQuiz = async (newQuiz) => {
	try {
		let newQ = new Quiz(newQuiz);

		let quiz = await newQ.save();

		return quiz;
	} catch (error) {
		return error;
	}
};

const getQuizTime = async (quizId) => {
	try {
		let result = await Quiz.findById(quizId).select("time");
		console.log("GET TIMEEE", result);
		return { time: result.time };
	} catch (error) {
		console.log(error);
		return error;
	}
};

module.exports = {
	getQuiz,
	getQuizTime,
	createQuiz,
};
