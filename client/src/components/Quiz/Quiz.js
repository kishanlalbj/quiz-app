import React from "react";
import { Card, Button } from "react-bootstrap";

const Quiz = (props) => {
	return (
		<React.Fragment>
			<Card>
				<Card.Body>
					<Card.Title>{props.name}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						{props.category}
					</Card.Subtitle>
					<Button
						variant="dark"
						onClick={(e) => props.onClickHandler(e, props.id)}
					>
						Take Quiz
					</Button>
				</Card.Body>
			</Card>
		</React.Fragment>
	);
};

export default Quiz;
