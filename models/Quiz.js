const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now(),
	},
});

const Quiz = mongoose.model("quiz", QuizSchema);

module.exports = Quiz;
