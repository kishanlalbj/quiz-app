const router = require("express").Router();
const Quiz = require("../../models/Quiz");
const { getQuiz, getQuizTime } = require("./quizController");
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
router.post("/:id/submit", (req, res) => {
	try {
		let quizId = req.params.id;
		let answers = req.body;
		// console.log(quizId, answers);
		let resp = checkAnswers(quizId, answers);
		console.log(resp);
		res.send({ points: resp });
	} catch (error) {
		console.log(error);
		res.statusCode(500).send("Internal Server Error");
	}
});

router.get("/:id/time", (req, res) => {
	try {
		let quizId = req.params.id;

		let time = getQuizTime(quizId);
		console.log("Time Left", time);
		res.send({ time });
	} catch (error) {
		res.statusCode(500).send("Internal Server Error");
	}
});
module.exports = router;
