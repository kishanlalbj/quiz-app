const mongoose = require("mongoose");
const ResultSchema = require("./Result");

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
  authorizedUsers: [
    {
      user: { type: Schema.Types.ObjectId },
    },
  ],
  attemptedBy: [Schema.Types.ObjectId],
  result: [ResultSchema],
});

const Quiz = mongoose.model("quiz", QuizSchema);

module.exports = Quiz;
