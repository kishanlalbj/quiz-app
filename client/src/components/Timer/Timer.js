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

	// const memoizedCallback = useCallback(calculateTimeLeft, []);

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const { submitted, onTimeUp } = props;

	useEffect(() => {
		let timer = setTimeout(() => {
			setTime(time - 1);
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		if (submitted) clearTimeout(timer);

		if (time === -1) {
			clearTimeout(timer);
			onTimeUp();
		}
		return () => clearTimeout(timer);
		// eslint-disable-next-line
	}, [time, calculateTimeLeft, submitted, onTimeUp]);

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
