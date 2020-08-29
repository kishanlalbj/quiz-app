import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import quizReducer from "./reducers/quizReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	quizStore: quizReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
