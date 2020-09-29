import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";

const QuestionPanel = (props) => {
	const [selected, setSelected] = useState("");

	const captureAnswer = (questionId, answer) => {
		props.captureAnswer(questionId, answer);
		setSelected(answer);
	};

	useEffect(() => {
		let result = props.selectedAnswer.filter((ans) => {
			return ans.questionId === props.questionId;
		});
		if (result.length > 0) setSelected(result[0].answer);

		return () => {
			console.log("Clean Up");
		};
	}, [props.selectedAnswer, props.questionId]);

	return (
		<React.Fragment>
			<div>
				<h4>{props.question}</h4>
				<div style={{ height: "400px" }}>
					<Row>
						{props.options.map((opt, index) => {
							return (
								<Col
									md={6}
									key={index}
									className={"moveTop"}
									style={{ cursor: "pointer" }}
									onClick={() => captureAnswer(props.questionId, opt.text)}
								>
									<Card
										body
										text={selected === opt.text ? "light" : "dark"}
										bg={selected === opt.text ? "dark" : null}
									>
										{opt.text}
									</Card>
								</Col>
							);
						})}
					</Row>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}
				>
					<div>
						{!props.hidePrevious ? (
							<Button variant="dark" onClick={props.onPrevious}>
								Previous
							</Button>
						) : null}
					</div>
					<div>
						{!props.hideNext ? (
							<Button variant="dark" onClick={props.onNext}>
								Next
							</Button>
						) : (
							<Button variant="dark" onClick={props.onSubmit}>
								Submit
							</Button>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default QuestionPanel;
