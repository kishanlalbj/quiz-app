import jwt_decode from "jwt-decode";
import setAuthHeader from "./api";

export const checkAuth = () => {
	let token = localStorage.getItem("jwtToken");

	console.log("Checking token");

	if (token) {
		const decoded = jwt_decode(token);
		const currentTime = Date.now() / 1000;

		if (decoded.exp < currentTime) {
			localStorage.removeItem("jwtToken");
			setAuthHeader(null);
			console.log("Expired Token");
			return false;
		}
		setAuthHeader(token);
		console.log("Valid Token");
		return true;
	}

	return false;
};

export const getUserFromToken = () => {
	let token = localStorage.getItem("jwtToken");

	const user = jwt_decode(token);
	return user;
};
