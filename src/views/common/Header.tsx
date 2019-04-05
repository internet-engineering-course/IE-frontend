import React, { Component } from "react";
import "src/views/common/Header.scss";
import "src/scss/style.scss";
import logoUrl from "src/resources/img/logo_v1.png";
import { DEFAULT_USER_ID } from "src/constants/constants";

export default class Header extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const isUserLoggedIn: boolean = this.props.isUserLoggedIn;
		if (isUserLoggedIn) {
			const result = this.userHeader();
			return result;
		} else {
			const result = this.guestHeader();
			return result;
		}
	}

	guestHeader = () => {
		return (
			<header>
				<div className="header">
					<div className="container header-hover">
						<div className="row justify-content-between align-items-center">
							<div id="logo" className="col-auto">
								<img src={logoUrl} alt="jobonja-logo" />
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	};

	userHeader = () => {
		return (
			<header>
				<div className="header">
					<div className="container header-hover">
						<div className="row justify-content-between align-items-center">
							<div id="logo" className="col-auto">
								<img src={logoUrl} alt="jobonja-logo" />
							</div>
							<nav className="col-auto">
								<div className="row align-items-center">
									<a
										href={"/profile/" + DEFAULT_USER_ID}
										className="col-auto profile-link">
										حساب کاربری
									</a>
									<div className="col-auto">خروج</div>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</header>
		);
	};
}

interface Props {
	isUserLoggedIn: boolean;
}
interface State {}
