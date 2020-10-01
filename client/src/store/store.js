import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import quizReducer from "./reducers/quizReducer";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	quizStore: quizReducer,
	authStore: authReducer
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
