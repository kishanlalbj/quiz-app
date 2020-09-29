const router = require("express").Router();
const Quiz = require("../../models/Quiz");
const { getQuiz, getQuizTime, createQuiz } = require("./quizController");
const { checkAnswers } = require("../questions/questionsController");

/**
 * PATH: /api/quiz
 * METHOD: GET
 * Description: get all quiz
 * Access: private
 */
router.get("/all", async (req, res) => {
	try {
		let resp = await getQuiz();
		res.send(resp);
	} catch (error) {
		res.statusCode(500).send("Internal Server Error");
	}
});

/**
 * PATH : /api/quiz/:quzId/submit
 * METHOD: POST
 * DESCRIPTION: submit a quiz
 * ACCESS: Private
 */
router.post("/:id/submit", async (req, res) => {
	try {
		let quizId = req.params.id;
		let answers = req.body;
		let resp = await checkAnswers(quizId, answers);
		res.send(resp);
	} catch (error) {
		console.log(error);
		res.statusCode(500).send("Internal Server Error");
	}
});

router.get("/:id/time", async (req, res) => {
	try {
		let quizId = req.params.id;
		let time = await getQuizTime(quizId);
		res.send(time);
	} catch (error) {
		res.statusCode(500).send("Internal Server Error");
	}
});

router.post("/new", async (req, res) => {
	try {
		let quiz = await createQuiz(req.body);
		res.send(quiz);
	} catch (error) {
		console.log(error);
		res.statusCode(500).send("Internal Server Error");
	}
});

module.exports = router;
