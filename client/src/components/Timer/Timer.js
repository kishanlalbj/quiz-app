import React, { useState, useEffect } from "react";

const Timer = (props) => {
	const [time, setTime] = useState(props.minutes * 60);

	const calculateTimeLeft = () => {
		if (time !== 0) {
			return {
				minutes: Math.floor(time / 60),
				seconds: time % 60,
			};
		} else {
			return {
				minutes: 0,
				seconds: 0,
			};
		}
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const { submitted } = props;

	useEffect(() => {
		// console.log("Component Did Mount", time, props.submitted);

		let timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
			setTime(time - 1);
		}, 1000);

		if (submitted) clearTimeout(timer);

		if (time === -1) {
			clearTimeout(timer);
			props.onTimeUp();
		}
		return () => clearTimeout(timer);
	}, [time]);

	return (
		<React.Fragment>
			<h4>
				{timeLeft.minutes}:
				{timeLeft.seconds < 10 ? "0" + timeLeft.seconds : timeLeft.seconds}
			</h4>
		</React.Fragment>
	);
};

export default Timer;
