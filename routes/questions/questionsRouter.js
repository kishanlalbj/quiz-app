const router = require("express").Router();
const questionsController = require("./questionsController");

/**
 * router: /api/questions/
 * method: GET
 * access: Private
 */
router.get("/:quizId", (req, res) => {
	try {
		let quizId = req.params.quizId;
		let questions = questionsController.getQuestions(quizId);
		res.send(questions);
	} catch (error) {
		console.log(error);
		res.statusCode(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
