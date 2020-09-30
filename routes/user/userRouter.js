const router = require("express").Router();
const auth = require("../../auth/auth");

router.post("/register", async (req, res) => {
	try {
		let resp = await auth.registerUser(req.body, "user");

		if (resp.success) res.status(201).json(resp);
		else res.status(500).json(resp);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/admin/register", async (req, res) => {
	try {
		let resp = await auth.registerUser(req.body, "admin");

		if (resp.success) res.status(200).json(resp);
		else res.status(400).json(resp);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		let resp = await auth.login(req.body);

		if (resp.success) res.status(200).json(resp);
		else res.status(500).json(resp);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/logout", async (req, res) => {
	try {
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
