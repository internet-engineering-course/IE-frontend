import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import Bar from "src/views/common/bar/Bar";
import ProfilePhoto from "src/resources/img/profile.jpg";
import "./Profile.css";

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
						<div className="container h-100">
							<div className="row h-100 align-items-end no-gutters">
								<div className="col-auto">
									<span className="profile-bar dark-bar" />
								</div>
							</div>
						</div>
					</Bar>
					<section className="container">
						<div className="row align-items-center">
							<div className="col-auto">
								<div className="profile-border">
									<img
										src={ProfilePhoto}
										alt="Profile Photo"
										className="profile-image"
									/>
								</div>
							</div>
							<div className="col-auto">
								<h2>نوید اکبری</h2>
								<p style={{ color: "#787878" }}>دانشجو</p>
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		);
	}
}

interface Props {}
interface State {}
