import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthHeader from "../../utils/api";
import { AUTH_TYPES } from "../types/authTypes"

export const login = (email, password) => async dispatch => {
    let response = await axios.post("/api/auth/login", {email, password})

    let token = response.data.message
    localStorage.setItem("jwtToken", token)
    setAuthHeader(token)
    const decoded = jwt_decode(token)

    dispatch({
        type: AUTH_TYPES.LOGIN,
        payload: decoded
    })
}

export const logout = () => async dispatch => {
    let response = await axios.post("/api/auth/logout")
    
    if(response.data.success) {
        setAuthHeader(null)
        localStorage.removeItem("jwtToken")
        dispatch({
            type: AUTH_TYPES.LOGOUT
        })
    } 
}