import React, { Component } from "react";
import Header from "src/views/common/Header.tsx";
import Footer from "src/views/common/Footer.tsx";
import Bar from "src/views/common/bar/Bar.tsx";
import ProfileBar from "src/views/common/bar/ProfileBar.tsx";

export default class Profile extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Header isUserLoggedIn={true} />
				<main>
					<Bar height={"150px"}>
						<ProfileBar />
					</Bar>
				</main>
				<Footer />
			</div>
		);
	}
}

interface Props {}
interface State {}
