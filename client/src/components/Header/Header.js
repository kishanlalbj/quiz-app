import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = (props) => {
	return (
		<React.Fragment>
			<Navbar bg="dark" variant="dark" style={{ height: "7vh" }}>
				<Navbar.Brand>
					<Link
						to="/"
						style={{
							textDecoration: "none",
							color: "white",
						}}
					>
						Quizzy
					</Link>
				</Navbar.Brand>
			</Navbar>
		</React.Fragment>
	);
};

export default Header;
