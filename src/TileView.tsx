import React from "react";
import TileItem from "./TileItem";
import styles from "./TileView.module.css";

type Props = {};

const TileView = (props: Props) => {
	return (
		<>
			<h1>TileView</h1>
			<div className={styles.tileView}>
				<TileItem />
				<TileItem />
				<TileItem />
				<TileItem />
				<TileItem />
				<TileItem />
				<TileItem />
				<TileItem />
			</div>
		</>
	);
};

export default TileView;
