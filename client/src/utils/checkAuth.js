import jwt_decode from "jwt-decode";
import setAuthHeader from "./api";

export const checkAuth = () => {
  let token = localStorage.getItem("jwtToken");

  console.log("Checking token");

  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    setAuthHeader(token);
    if (decoded.exp < currentTime) return false;

    return true;
  }

  return false;
};

export const getUserFromToken = () => {
  let token = localStorage.getItem("jwtToken");

  const user = jwt_decode(token);
  return user;
};
