const router = require("express").Router();
const questionsController = require("./questionsController");

/**
 * router: /api/questions/
 * method: GET
 * access: Private
 */
router.get("/:quizId", async (req, res) => {
	try {
		let quizId = req.params.quizId;
		let questions = await questionsController.getQuestions(quizId);
		console.log("Questions", questions);
		res.send(questions);
	} catch (error) {
		console.log(error);
		res.statusCode(500).json({ message: "Internal Server Error" });
	}
});

router.post("/:quizId/upload", async (req, res) => {
	try {
		const { quizId } = req.params;
		console.log(quizId);
		let file = req.files;
		let questionFile = JSON.parse(file.myFile.data.toString());

		let questions = await questionsController.addQuestionsInBulk(
			quizId,
			questionFile.questions
		);

		res.send(questions);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
