const Question = require("../../models/Questions");
const Quiz = require("../../models/Quiz");

const getQuestions = async (qId) => {
	try {
		let results = await Question.find({ quizId: qId });
		return results;
	} catch (error) {
		return error;
	}
};

const addQuestionsInBulk = async (quizId, questions) => {
	try {
		questions.forEach((ques) => {
			ques.quizId = quizId;
		});
		let data = await Question.insertMany(questions);
		return data;
	} catch (error) {
		return error;
	}
};

const checkAnswers = async (quizId, answers) => {
	try {
		let quizQuestions = await Question.find({ quizId: quizId });
		let correctQuestions = [];

		for (let i = 0; i < quizQuestions.length; i++) {
			for (let j = 0; j < answers.length; j++) {
				if (quizQuestions[i]._id.toString() === answers[j].questionId) {
					quizQuestions[i].options.map((option) => {
						if (option.text === answers[j].answer && option.correct) {
							correctQuestions.push({
								questionId: answers[j].questionId,
								correct: option.correct,
							});
						}
					});
				}
			}
		}

		let res = await Quiz.findById(quizId).select("passPercentage");

		let percentageObtained = Math.ceil(
			(correctQuestions.length / quizQuestions.length) * 100
		);

		let result = {
			percentage: percentageObtained,
			score: correctQuestions.length,
		};
		if (percentageObtained >= res.passPercentage) {
			result.passed = true;
		} else {
			result.passed = false;
		}
		return result;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getQuestions,
	checkAnswers,
	addQuestionsInBulk,
};
