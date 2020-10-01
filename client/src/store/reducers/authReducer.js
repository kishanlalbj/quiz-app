const { AUTH_TYPES } = require("../types/authTypes");

const INITIAL_STATE = {
    user: null,
    authenticated: false
}

const authReducer = (state= INITIAL_STATE, action) => {
        switch (action.type) {
            case AUTH_TYPES.LOGIN:

            console.log("ACTION DISPATCHED", action.payload)
                return {
                    ...state,
                    user: action.payload,
                    authenticated: true
                }
            case AUTH_TYPES.LOGOUT:
                return {
                    ...state,
                    authenticated: false,
                    user: null
                }
            case AUTH_TYPES.SET_USER_DETAILS:
                return {
                    ...state,
                    authenticated: true,
                    user: action.payload
                }
            default:
                return state
        }
}

export default authReducer;