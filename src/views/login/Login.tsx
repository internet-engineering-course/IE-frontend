import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import {login} from "src/api/AuthAPI"
import { toast, ToastContainer } from "react-toastify";

export default class Login extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { 
			password: "",
			username: ""
		}
	}

	handleInputChange = (event: any) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name]: value
		} as any);
	};
	
	login = (event: any) =>{
		event.preventDefault();
		login(this.state.username, this.state.password)
		.then()
		.catch(error => toast.warn(error.response.data));
		console.log("asda")
	}

	render() {
		return (
			<div>
				<Header isUserLoggedIn={false} />
				<main>
					<div>
						<div className="slider">
							<div className="slide slide1" />
							<div className="slide slide2" />
							<div className="slide slide3" />
						</div>
					</div>
					<div className="container h-100">
						<div className="row justify-content-center align-items-center main-height">
							<div className="col-md-9">
								<form className="register-form"
										onSubmit={this.login}>
									<h1 className="center-text">ورود</h1>
									<hr />
									<div className="row justify-content-center">
										<div className="col-md-9">
											<label>
												<b>نام کاربری</b>
											</label>
											<input
												type="text"
												className="text-box"
												placeholder="نام کاربری خود را وارد کنید"
												name="username"
												onChange={this.handleInputChange}
												required
											/>
										</div>
									</div>
									<div className="row justify-content-center">
										<div className="col-md-9">
											<label>
												<b>رمز عبور</b>
											</label>
											<input
												type="password"
												className="text-box"
												placeholder="رمز عبور خود را وارد کنید"
												name="password"
												onChange={this.handleInputChange}
												required
											/>
										</div>
									</div>
									<div className="row justify-content-center">
										<div className="col-sm-4">
											<button
												type="submit"
												className="signupbtn register-button">
												ورود
											</button>
										</div>
									</div>
									<div className="center-text py-2">
										کاربر جدید هستید؟{" "}
										<a href="/register">ثبت نام</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</main>
				<Footer />
				<ToastContainer />
			</div>
		);
	}
}

interface State {
	username:string;
	password:string;
}

interface Props {}
