import React, { useCallback, useState, useRef } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import axios from "axios";
import "./Registration.scss";

const Registration = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const usernameRef = useRef(null);
  const [isUnique, setIsUnique] = useState("");

  const checkUsernameAvailability = async () => {
    if (usernameRef.current.value.length === 0) {
      setIsUnique("Username cannot be empty");
      return;
    }
    if (usernameRef.current.value.length >= 6) {
      let response = await axios.post("/api/auth/check/username", {
        username: usernameRef.current.value,
      });

      if (response.data.available) {
        setIsUnique("Username is available");
      } else {
        setIsUnique("Username is taken by someone else");
      }
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (password === confirmPassword) {
        let response = await axios.post("/api/auth/register", {
          name,
          email,
          username: usernameRef.current.value,
          password,
          confirmPassword,
        });
        console.log(response);
        if (response.data.success) {
          props.history.push("/");
        }
      } else {
        alert("Passwords doesn't match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function debounce(func, delay) {
    let timeout;
    return () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func();
      }, delay);
    };
  }

  const debounceOnChange = useCallback(
    debounce(checkUsernameAvailability, 400),
    []
  );

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
                  controlid="validationCustom01"
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  ref={usernameRef}
                  onChange={(e) => debounceOnChange(e.target.value)}
                  controlid="validationCustom02"
                  minLength="6"
                  maxLength="18"
                  required
                ></Form.Control>
                <p className="text-muted">{isUnique}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  controlid="validationCustom03"
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
                  controlid="validationCustom04"
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
                  controlid="validationCustom05"
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
