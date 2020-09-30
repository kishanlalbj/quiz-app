const router = require("express").Router();
const path = require("path");
const { getQuiz, getQuizTime, createQuiz } = require("./quizController");
const { checkAnswers } = require("../questions/questionsController");
const passport = require("passport");
const { checkRoles } = require("../../auth/auth");

router.get(
	"/user",
	passport.authenticate("jwt", { session: false }),
	checkRoles(["user", "admin"]),
	(req, res) => {
		res.send("USER LOGIN SUCCESS FULL");
	}
);

router.get(
	"/admin",
	passport.authenticate("jwt", { session: false }),
	checkRoles(["admin"]),
	(req, res) => {
		res.send("ADMIN LOGIN SUCCESS FULL");
	}
);

/**
 * PATH: /api/quiz
 * METHOD: GET
 * Description: get all quiz
 * ACCESS: private
 */
router.get(
	"/all",
	passport.authenticate("jwt", { session: false }),
	checkRoles(["admin"]),
	async (req, res) => {
		try {
			let resp = await getQuiz();
			res.status(200).json(resp);
		} catch (error) {
			res.status(500).send("Internal Server Error");
		}
	}
);

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

/**
 * PATH : /api/quiz/:quzId/time
 * METHOD: GET
 * DESCRIPTION: Get the duration of the quiz
 * ACCESS: Private
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
 * PATH : /api/quiz/new
 * METHOD: POST
 * DESCRIPTION: Create a new Quiz
 * ACCESS: Private
 */
router.post(
	"/new",
	passport.authenticate("jwt", { session: false }),
	checkRoles(["admin"]),
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
 * PATH : /api/quiz/template/download
 * METHOD: GET
 * DESCRIPTION: Download the questions template file
 * ACCESS: Private
 */
router.get("/template/download", (req, res) => {
	try {
		res.download(path.join(__dirname, "../../quizTemplate.json"));
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
