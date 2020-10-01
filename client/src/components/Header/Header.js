import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

const Header = (props) => {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link
            to={
              props.authenticated && props.user?.role === "admin"
                ? "/admin"
                : "/home"
            }
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Quizzy
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            {props.authenticated ? (
              <React.Fragment>
                <Nav.Link>{props.user?.name}</Nav.Link>
                <Nav.Link onClick={props.logout}>Logout</Nav.Link>
              </React.Fragment>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.authStore.authenticated,
  user: state.authStore.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
