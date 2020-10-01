const router = require("express").Router();
const path = require("path");
const { getQuiz, getQuizTime, createQuiz } = require("./quizController");
const { checkAnswers } = require("../questions/questionsController");
const passport = require("passport");
const { checkRoles } = require("../../auth/auth");
const roles = require("../../auth/roles");

router.get(
	"/user",
	passport.authenticate("jwt", { session: false }),
	checkRoles([roles.ADMIN, roles.USER]),
	(req, res) => {
		res.send("USER DATA SUCCESS FULL");
	}
);

router.get(
	"/admin",
	passport.authenticate("jwt", { session: false }),
	checkRoles([roles.ADMIN]),
	(req, res) => {
		res.send("ADMIN LOGIN SUCCESS FULL");
	}
);

/**
 * @path /api/quiz
 * @method GET
 * @description get all quiz
 * @access private
 */
router.get(
	"/all",
	passport.authenticate("jwt", { session: false }),
	checkRoles([roles.ADMIN, roles.USER]),
	async (req, res) => {
		try {
		console.log(req.user)

			let resp = await getQuiz();
			res.status(200).json(resp);
		} catch (error) {
			res.status(500).send("Internal Server Error");
		}
	}
);

/**
 * @path /api/quiz/:id/submit
 * @method POST
 * @description submits a quiz
 * @access private
 * @param quizId
 */
router.post(
	"/:id/submit",
	passport.authenticate("jwt", { session: false }),
	checkRoles([roles.USER]),
	async (req, res) => {
		try {
			let quizId = req.params.id;
			let answers = req.body;
			let resp = await checkAnswers(quizId, answers);
			res.send(resp);
		} catch (error) {
			console.log(error);
			res.statusCode(500).send("Internal Server Error");
		}
	}
);

/**
 * @path  /api/quiz/:quzId/time
 * @method GET
 * @description Get the duration of the quiz
 * @access private
 * @param QuizId
 */
router.get("/:id/time", async (req, res) => {
	try {
		let quizId = req.params.id;
		let time = await getQuizTime(quizId);
		res.send(time);
	} catch (error) {
		res.statusCode(500).send("Internal Server Error");
	}
});

/**
 * @path /api/quiz/new
 * @method POST
 * @description Create a new Quiz
 * @access private
 */
router.post(
	"/new",
	passport.authenticate("jwt", { session: false }),
	checkRoles([roles.ADMIN]),
	async (req, res) => {
		try {
			let quiz = await createQuiz(req.body);
			res.send(quiz);
		} catch (error) {
			console.log(error);
			res.statusCode(500).send("Internal Server Error");
		}
	}
);

/**
 * @path  /api/quiz/template/download
 * @method GET
 * @description Download the questions template file
 * @access private
 */
router.get(
	"/template/download",
	passport.authenticate("jwt", { session: false }),
	checkRoles([roles.ADMIN]),
	(req, res) => {
		try {
			res.download(path.join(__dirname, "../../quizTemplate.json"));
		} catch (error) {
			console.log(error);
			res.status(500).send("Internal Server Error");
		}
	}
);

module.exports = router;
