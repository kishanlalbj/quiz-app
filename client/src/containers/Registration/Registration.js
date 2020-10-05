import React, { useState, useRef, useEffect } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import axios from "axios";
import "./Registration.scss";

const Registration = (props) => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [unique, setUnique] = useState(true);

	const usernameEle = useRef(null);

	useEffect(() => {
		setUsername(usernameEle.current.value);
		console.log(usernameEle.current.value);
	}, [username]);

	const onSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			if (password === confirmPassword) {
				console.log(name, username, email, password, confirmPassword);
			} else {
				alert("Passwords not matching");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const debouncing = (fn, delay) => {
		console.log("Debouncing");
		let timer;
		return () => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn();
			}, delay);
		};
	};

	const checkUsername = async () => {
		let response = await axios.post("/api/auth/check/username", {
			username: username,
		});

		if (!response.data.available) {
			console.log("Username already taken");
			setUnique(false);
		} else {
			setUnique(true);
		}
	};

	const usernameHandler = (e) => {
		// setUsername(e.target.value);
		let input = e.target.value;
		debouncing(checkUsername, 400);
	};

	return (
		<React.Fragment>
			<Container>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Card body className="registration-card">
						<center>
							<h3>Registration</h3>
						</center>
						<Form onSubmit={onSubmitHandler}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								></Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									placeholder="Username"
									value={username}
									ref={usernameEle}
									onChange={usernameHandler}
									required
								></Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								></Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								></Form.Control>
							</Form.Group>

							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								></Form.Control>
							</Form.Group>

							<Form.Group>
								<center>
									<Button type="submit" variant="dark">
										Register
									</Button>
								</center>
							</Form.Group>
						</Form>
					</Card>
				</div>
			</Container>
		</React.Fragment>
	);
};

export default Registration;
