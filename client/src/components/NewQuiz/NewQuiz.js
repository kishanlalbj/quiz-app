import React, { Component } from "react";
import {
	Form,
	FormGroup,
	Container,
	Card,
	Row,
	Col,
	Button,
} from "react-bootstrap";

class NewQuiz extends Component {
	state = {
		quizName: "",
		category: "",
	};

	render() {
		return (
			<React.Fragment>
				<Container>
					<br></br>
					<h4>New Quiz</h4>

					<Form>
						<Row>
							<Col md={6}>
								<FormGroup>
									<Form.Label> Quiz Name</Form.Label>
									<Form.Control type="text" placeholder="Quiz name" />
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Form.Label> Category</Form.Label>
									<Form.Control as="select" placeholder="Quiz Category">
										<option>Technology</option>
										<option>Science</option>
										<option>Mathematics</option>
										<option>History</option>
									</Form.Control>
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col md={6}>
								<FormGroup>
									<Form.Label> Difficulty </Form.Label>
									<Form.Control as="select" placeholder="Quiz Category">
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
										placeholder="Minimum percentage to pass"
									></Form.Control>
								</FormGroup>
							</Col>
						</Row>

						<Card body>
							<Row>
								<Col md={6}>
									<FormGroup>
										<Form.File
											id="exampleFormControlFile1"
											label="Questions CSV file"
										/>
									</FormGroup>
								</Col>
								<Col md={6}>
									<Button> Download Template </Button>
									&nbsp;
									<Button> Download Sample </Button>
								</Col>
							</Row>
						</Card>
						<br></br>
						<Row>
							<Col md={12}>
								<center>
									<FormGroup>
										<Button type="submit"> Create </Button>
									</FormGroup>
								</center>
							</Col>
						</Row>
					</Form>
				</Container>
			</React.Fragment>
		);
	}
}

export default NewQuiz;
