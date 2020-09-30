const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const registerUser = async (userDetails) => {
	try {
		let username = await User.findOne({ username: userDetails.username });
		let email = await User.findOne({ email: userDetails.email });

		if (username)
			return {
				success: false,
				message: "username already exists",
			};

		if (email) {
			return {
				success: false,
				message: "Email already registered",
			};
		}

		const hashed = await bcrypt.hash(userDetails.password, 12);

		let newUser = new User({
			...userDetails,
			password: hashed,
		});

		await newUser.save();

		return {
			success: true,
			message: "User Registered Successfully",
		};
	} catch (error) {
		return error;
	}
};

const login = async (userCreds) => {
	try {
		let user = await User.findOne({
			email: userCreds.email,
		});
		console.log(user);
		if (!user) {
			return {
				success: false,
				message: "User not found",
			};
		}

		let isMatch = await bcrypt.compare(userCreds.password, user.password);

		if (isMatch) {
			jwt.sign();
		}

		console.log(obj);
		return {
			success: true,
			message: obj,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

module.exports = {
	registerUser,
	login,
};