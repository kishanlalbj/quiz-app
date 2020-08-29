const questions = [
	{
		id: "200",
		quizId: "100",
		question: "What is ReactJS ?",
		options: [
			{
				correct: false,
				text: "A backend framework in Java",
			},
			{
				correct: false,
				text: "A Javascript framework for Backend",
			},
			{
				correct: false,
				text: "A MVC framework in javascript",
			},
			{
				correct: true,
				text: "A view framework in Javascript",
			},
		],
	},
	{
		id: "201",
		quizId: "100",
		question: "How do you get direct acces to DOM ?",
		options: [
			{
				correct: false,
				text: "Context API",
			},
			{
				correct: false,
				text: "Memo",
			},
			{
				correct: false,
				text: "dangerouslysetInnerHTML",
			},
			{
				correct: true,
				text: "Ref",
			},
		],
	},
	{
		id: "202",
		quizId: "100",
		question: "How to pass values between components ?",
		options: [
			{
				correct: true,
				text: "Context API",
			},
			{
				correct: false,
				text: "Provider",
			},
			{
				correct: false,
				text: "Consumer",
			},
			{
				correct: false,
				text: "React Router Params",
			},
		],
	},
];

const getQuestions = (qId) => {
	try {
		let results = questions.filter((ques) => ques.quizId === qId);

		return results;
	} catch (error) {
		return error;
	}
};

const checkAnswers = (quizId, answers) => {
	try {
		console.log(answers);
		let quizQuestions = questions.filter((ques) => ques.quizId === quizId);
		let result = [];
		let count = 0;
		for (let i = 0; i < quizQuestions.length; i++) {
			for (let j = 0; j < answers.length; j++) {
				// console.log(quizQuestions[i].id, answers[j].questionId);

				if (quizQuestions[i].id === answers[j].questionId) {
					quizQuestions[i].options.map((option) => {
						if (option.text === answers[j].answer && option.correct) {
							count++;
							result.push({
								questionId: answers[j].questionId,
								correct: option.correct,
							});
						}
					});
				}
			}
		}
		return count;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getQuestions,
	checkAnswers,
};
