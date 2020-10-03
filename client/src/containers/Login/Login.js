import React, { useEffect, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import "./Login.scss";

import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const { user } = props;
    if (user?.role === "admin") {
      props.history.push("/admin");
    } else if (user?.role === "user") {
      props.history.push("/home");
    }
  }, [props.user, props.authenticated, props.login, props]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      props.login(email, password);
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
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email or Username"
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
                <center>
                  <Button type={"submit"} variant="dark">
                    Login
                  </Button>{" "}
                  <Button as={Link} to="/register" variant="dark">
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

const mapStateToProps = (state) => ({
  authenticated: state.authStore.authenticated,
  user: state.authStore.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
