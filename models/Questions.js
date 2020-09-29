const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = {
	quizId: { type: Schema.Types.ObjectId },
	question: {
		type: String,
		required: false,
	},
	options: [
		{
			text: { type: String, required: true },
			correct: { type: Boolean, default: false },
		},
	],
};

const Question = mongoose.model("question", QuestionSchema);

module.exports = Question;
