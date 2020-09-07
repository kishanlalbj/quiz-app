import React from "react";
import "./Sidenav.scss";

const SideNav = (props) => {
	return (
		<React.Fragment>
			<ul className="sidenav">
				{props.items.map((item, index) => {
					return (
						<li key={index} onClick={() => props.onSelectItem(item)}>
							<h6>{item}</h6>
						</li>
					);
				})}
			</ul>
		</React.Fragment>
	);
};

export default SideNav;
