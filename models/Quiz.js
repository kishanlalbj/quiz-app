const mongoose = require("mongoose");
// const ResultSchema = require("./Result");

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
  attemptedBy: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      passed: { type: Boolean },
      percentage: { type: Number },
    },
  ],
});

const Quiz = mongoose.model("quiz", QuizSchema);

module.exports = Quiz;
