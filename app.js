const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const quizRouter = require("./routes/quiz/quizRouter");
const questionsRouter = require("./routes/questions/questionsRouter");
require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose
	.connect("mongodb://localhost:27017/quiz", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((status) => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log("Error Connecting Database");
	});

app.use("/api/quiz", quizRouter);
app.use("/api/questions", questionsRouter);

module.exports = app;
