const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
	quizName: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	time: {
		type: Number,
		required: true,
	},
	difficulty: {
		type: String,
		required: true,
	},
	passPercentage: {
		type: Number,
		required: true,
	},
});

const Quiz = mongoose.model("quiz", QuizSchema);

module.exports = Quiz;
