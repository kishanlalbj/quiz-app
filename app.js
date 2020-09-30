const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const quizRouter = require("./routes/quiz/quizRouter");
const questionsRouter = require("./routes/questions/questionsRouter");
const authRouter = require("./routes/user/userRouter");
const fileupload = require("express-fileupload");
const config = require("./config");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose
	.connect(config.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log("Error Connecting Database");
	});

app.use("/api/quiz", quizRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/auth", authRouter);

module.exports = app;
