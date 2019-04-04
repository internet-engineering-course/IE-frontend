import React, { Component } from "react";
import "./Bar.css";

export default class Bar extends Component<Props, State> {
	render() {
		document.documentElement.style.setProperty(
			"--Height",
			this.props.height
		);
		return <section className="bar">{this.props.children}</section>;
	}
}

interface Props {
	height: string;
}

interface State {}