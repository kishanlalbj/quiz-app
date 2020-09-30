const router = require("express").Router();
const passport = require("passport");
const { checkRoles } = require("../../auth/auth");
const roles = require("../../auth/roles");
const questionsController = require("./questionsController");

/**
 * @path /api/questions/:quizId
 * @method GET
 * @description Get questions for given quiz ID
 * @access private
 * @param quizId
 */
router.get(
	"/:quizId",
	passport.authenticate("jwt", { session: false }),
	checkRoles([roles.USER]),
	async (req, res) => {
		try {
			let quizId = req.params.quizId;
			let questions = await questionsController.getQuestions(quizId);
			res.send(questions);
		} catch (error) {
			console.log(error);
			res.statusCode(500).json({ message: "Internal Server Error" });
		}
	}
);

/**
 * @path /api/questions/:quizId/upload
 * @method GET
 * @description Upload the questions json file
 * @access private
 * @param quizid
 */
router.post(
	"/:quizId/upload",
	passport.authenticate("jwt", { session: false }),
	checkRoles([roles.ADMIN]),
	async (req, res) => {
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
	}
);

module.exports = router;
