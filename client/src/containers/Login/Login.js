import React, { useState, useEffect } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import "./Login.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log(email, password);
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
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="text"
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

export default Login;
