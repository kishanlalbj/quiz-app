import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuth } from "../../utils/checkAuth";
import { AUTH_TYPES } from "../../store/types/authTypes";

const ProtectedRoute = ({
	component: Component,
	authenticated,
	logout,
	...rest
}) => {
	return (
		<React.Fragment>
			<Route
				{...rest}
				render={(props) => {
					console.log("CHecking Auth in Route");
					let auth = checkAuth();
					if (!auth) {
						logout();
					}
					return auth ? (
						<Component {...props}></Component>
					) : (
						<Redirect to="/" />
					);
				}}
			></Route>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	authenticated: state.authStore.authenticated,
});

const mapDisptachToProps = (dispatch) => ({
	logout: () =>
		dispatch({
			type: AUTH_TYPES.LOGOUT,
		}),
});
export default connect(mapStateToProps, mapDisptachToProps)(ProtectedRoute);
