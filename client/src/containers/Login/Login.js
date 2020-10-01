import React, { useEffect, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import axios from "axios";
import "./Login.scss";
import setAuthHeader from "../../utils/api";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const { user } = props
			if(user?.role === "admin") {
				props.history.push("/admin")
			} else if(user?.role === "user") {
				props.history.push("/home")
			}
	},[props.user, props.authenticated, props.login])

	const onSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			console.log(email, password);

			props.login(email,password)
			// let response = await axios.post("/api/auth/login", { email, password });
			// console.log(response);
			// if (response.data.success) {
			// 	localStorage.setItem("jwtToken", response.data.message);
			// 	setAuthHeader(response.data.message);
			// 	const decoded = jwt_decode(localStorage.jwtToken);
			// 	console.log("Login", decoded);
			// 	if (decoded.role === "admin") props.history.push("/admin");
			// 	else props.history.push("/home");
			// }
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<Container>
				<div className="centering">
					<Card body className="login-card">
						<center>
							<h3>Login</h3>
						</center>
						<Form onSubmit={onSubmitHandler}>
							{/* <Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									placeholder="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								></Form.Control> 
							</Form.Group> */}
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group>
								<center>
									<Button type={"submit"} variant="dark">
										Login
									</Button>{" "}
									<Button variant="dark">Register</Button>
								</center>
							</Form.Group>
						</Form>
					</Card>
				</div>
			</Container>
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	authenticated: state.authStore.authenticated,
	user: state.authStore.user
})

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email,password))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
