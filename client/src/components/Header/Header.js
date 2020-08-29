import React from "react";
import { Navbar } from "react-bootstrap";


const Header = (props) => {
    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Quizzy</Navbar.Brand>
            </Navbar>
        </React.Fragment>
    )
}

export default Header;