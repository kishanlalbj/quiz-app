const Quiz = require("../../models/Quiz");

const quiz = [
	{
		id: 100,
		name: "ReactJS",
		category: "Front End",
		time: 1,
		totalQuestions: 10,
		difficulty: "easy",
		passPercentage: 70,
	},
	{
		id: 101,
		name: "NodeJS",
		totalQuestions: 15,
		time: 20,
		difficulty: "easy",
		category: "backEnd",
		passPercentage: 60,
	},
	{
		id: 103,
		name: "MongoDB",
		time: 15,
		totalQuestions: 20,
		difficulty: "easy",
		category: "",
		passPercentage: 60,
	},
];

const getQuiz = async () => {
	try {
		let quizzes = await Quiz.find();
		return quiz;
	} catch (error) {
		console.log(error);
		return error;
	}
};

module.exports = {
	getQuiz,
};
