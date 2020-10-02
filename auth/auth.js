const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const registerUser = async (userDetails, role) => {
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
      role,
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

    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    if (isMatch) {
      let token = await jwt.sign(payload, config.SECRET, {
        expiresIn: "2h",
      });
      return {
        success: true,
        message: `Bearer ${token}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const checkRoles = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else {
    return res.status(403).json({ message: "You are not authorized" });
  }
};

module.exports = {
  registerUser,
  login,
  checkRoles,
};
