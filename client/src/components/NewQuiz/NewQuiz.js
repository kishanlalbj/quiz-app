import React, { Component, createRef } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Container,
} from "react-bootstrap";
import axios from "axios";

class NewQuiz extends Component {
  state = {
    quizName: "",
    category: "",
    difficulty: "",
    time: 0,
    passPercentage: 0,

    authorizedUsers: [],
    selectedFile: null,
  };

  userRef = createRef(null);

  onChangehandler = (e) => this.setState({ [e.target.name]: e.target.value });

  downloadTemplate = async (e) => {
    const res = await axios.get("/api/quiz/template/download", {
      responseType: "blob",
    });
    const blob = await res.data;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "template.json");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  addUser = async (e) => {
    e.preventDefault();
    let response = await axios.post("/api/auth/user", {
      email: this.userRef.current.value,
    });
    if (response.data.success) {
      const currentUser = response.data;

      this.setState((prevState) => ({
        authorizedUsers: [...prevState.authorizedUsers, currentUser],
      }));
      this.userRef.current.value = "";
    } else {
      alert("User not found");
    }
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();

    const {
      quizName,
      category,
      difficulty,
      passPercentage,
      time,
      selectedFile,
    } = this.state;
    if (
      quizName &&
      category &&
      difficulty &&
      passPercentage &&
      time &&
      selectedFile
    ) {
      const formData = new FormData();
      formData.append("myFile", this.state.selectedFile);

      let [quizResponse] = await Promise.all([
        axios.post("/api/quiz/new", {
          quizName,
          category,
          difficulty,
          passPercentage,
          time,
        }),
      ]);
      console.log(quizResponse.data._id);
      let uploadStatus = await axios.post(
        `/api/questions/${quizResponse.data._id}/upload`,
        formData
      );
      console.log(uploadStatus.data);

      this.props.history.push("/admin");
    } else {
      alert("Please fill all fields");
    }
  };

  onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  render() {
    const { quizName, difficulty, category, passPercentage, time } = this.state;
    return (
      <React.Fragment>
        <Container>
          <h4>New Quiz</h4>
          <Card body>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Form.Label> Quiz Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Quiz name"
                      name="quizName"
                      onChange={this.onChangehandler}
                      value={quizName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Form.Label> Category</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Quiz Category"
                      name="category"
                      onChange={this.onChangehandler}
                      value={category}
                    >
                      <option>Choose</option>
                      <option>Technology</option>
                      <option>Science</option>
                      <option>Mathematics</option>
                      <option>Computer Science</option>
                    </Form.Control>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Form.Label> Difficulty </Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Difficulty"
                      onChange={this.onChangehandler}
                      name="difficulty"
                      value={difficulty}
                    >
                      <option>Choose</option>

                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </Form.Control>
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Form.Label> Pass percentage </Form.Label>
                    <Form.Control
                      type="number"
                      name="passPercentage"
                      value={passPercentage}
                      onChange={this.onChangehandler}
                      placeholder="Minimum percentage to pass"
                    ></Form.Control>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Form.Label> Time </Form.Label>
                    <Form.Control
                      type="number"
                      name="time"
                      value={time}
                      onChange={this.onChangehandler}
                      placeholder="Duration in minutes"
                    ></Form.Control>
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Form.File
                      id="exampleFormControlFile1"
                      label="Questions JSON file"
                      onChange={this.onFileChange}
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <Form.Group
                    style={{
                      marginTop: "25px",
                    }}
                  >
                    <Button onClick={this.downloadTemplate} variant="dark">
                      Download Sample
                    </Button>
                  </Form.Group>
                </Col>
              </Row>

              {/* <Row>
                <Col md={6}>
                  <Form.Label> Users </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="User"
                      name="user"
                      ref={this.userRef}
                    />
                    <InputGroup.Append>
                      <Button
                        onClick={this.addUser}
                        variant="outline-secondary"
                      >
                        Add
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <p>Users List</p>
                  <ListGroup>
                    {authorizedUsers.map((user, index) => {
                      return (
                        <React.Fragment>
                          <ListGroup.Item key={index}>{user}</ListGroup.Item>
                        </React.Fragment>
                      );
                    })}
                  </ListGroup>
                </Col>
              </Row> */}
              <br></br>
              <Row>
                <Col md={12}>
                  <center>
                    <FormGroup>
                      &nbsp;
                      <Button onClick={this.onSubmitHandler} variant="dark">
                        Create
                      </Button>
                    </FormGroup>
                  </center>
                </Col>
              </Row>
            </Form>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default NewQuiz;
