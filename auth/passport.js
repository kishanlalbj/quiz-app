const User = require("../models/User");
const { SECRET } = require("../config");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET,
};

module.exports = (passport) => {
	passport.use(
		new Strategy(opts, async (payload, done) => {
			try {
				let user = await User.findById(payload.id);
				if (user) return done(null, user);
				return done(null, false);
			} catch (error) {
				return done(null, false);
			}
		})
	);
};
