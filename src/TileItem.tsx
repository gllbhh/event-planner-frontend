import React from "react";
import styles from "./TileItem.module.css";

type Props = {};

const TileItem = (props: Props) => {
	return (
		<div className={styles.tile}>
			<h3>Event Title</h3>
			<p>
				Event Derscription: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat.
			</p>
		</div>
	);
};

export default TileItem;
