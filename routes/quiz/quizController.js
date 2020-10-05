const Quiz = require("../../models/Quiz");
const ResultSchema = require("../../models/Result");

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
		let result = await Quiz.findById(quizId).select("time quizName");
		return { time: result.time, quizName: result.quizName };
	} catch (error) {
		console.log(error);
		return error;
	}
};

const storeQuizResult = async (quizId, quizResult) => {
	try {
		console.log(quizId, quizResult);
		let quiz = await Quiz.findByIdAndUpdate(quizId, {
			$push: { attemptedBy: quizResult },
		});

		console.log("User", quiz);
		return quiz;
	} catch (error) {
		console.log(error);
		return error;
	}
};

module.exports = {
	getQuiz,
	getQuizTime,
	createQuiz,
	storeQuizResult,
};
