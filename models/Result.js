const mongoose = require("mongoose");

const { Schema } = mongoose;

const ResultSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  percentageScored: {
    type: Number,
  },
  passed: {
    type: Boolean,
  },
});

module.exports = ResultSchema;
