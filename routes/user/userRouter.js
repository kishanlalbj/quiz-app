const router = require("express").Router();
const auth = require("../../auth/auth");
const roles = require("../../auth/roles");
const passport = require("passport");
const { checkRoles } = require("../../auth/auth");
const User = require("../../models/User");

/**
 * @path /api/auth/register
 * @method POST
 * @description Registers a user
 * @access public
 */
router.post("/register", async (req, res) => {
  try {
    let resp = await auth.registerUser(req.body, roles.USER);

    if (resp.success) res.status(201).json(resp);
    else res.status(500).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @path /api/auth/admin/register
 * @method POST
 * @description Registers a admin
 * @access public
 */
router.post("/admin/register", async (req, res) => {
  try {
    let resp = await auth.registerUser(req.body, roles.ADMIN);
    if (resp.success) res.status(200).json(resp);
    else res.status(400).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @path /api/auth/login
 * @method POST
 * @description Logs in a user
 * @access public
 */
router.post("/login", async (req, res) => {
  try {
    let resp = await auth.login(req.body);

    if (resp.success) res.status(200).json(resp);
    else res.status(500).json(resp);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @path /api/auth/logout
 * @method POST
 * @description Logs out the user
 * @access private
 */
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  checkRoles([roles.ADMIN, roles.USER]),
  async (req, res) => {
    try {
      req.logOut();
      res.send({
        success: true,
        message: "Successfully logged out",
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

/**
 * @path /api/auth/check/username
 * @method POST
 * @description Check if username exists
 * @access public
 */

router.post("/check/username", async (req, res) => {
  try {
    let count = await User.find({ username: req.body.username }).count();

    res.status(200).send({ available: count === 0 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
