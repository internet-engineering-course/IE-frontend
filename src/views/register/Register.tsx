import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import "./Register.scss";
import { toast, ToastContainer } from "react-toastify";
export default class Register extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { password: "", password_confirm: "" };
	}

	handleInputChange = (event: any) => {
		const target = event.target;
		if (target.type === "password") {
			const name = target.name;
			const value = target.value;
			this.setState({
				[name]: value
			} as any);
		}
	};

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
								<form
									className="register-form py-3 px-5"
									onSubmit={event => {
										event.preventDefault();
										if (
											this.state.password !=
											this.state.password_confirm
										)
											toast.warn(
												"Passwords don't match!"
											);
									}}>
									<h1 className="center-text">ثبت نام</h1>
									<hr />
									<div className="row">
										<div className="col-md-6">
											<label>
												<b>نام</b>
											</label>
											<input
												type="text"
												className="text-box"
												placeholder="نام خود را وارد کنید"
												name="firstname"
												required
											/>
										</div>
										<div className="col-md-6">
											<label>
												<b>نام خانوادگی</b>
											</label>
											<input
												type="text"
												className="text-box"
												placeholder="نام خانوادگی وارد کنید"
												name="lastname"
												required
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<label>
												<b>نام کاربری</b>
											</label>
											<input
												type="text"
												className="text-box right-placeholder"
												placeholder="نام کاربری وارد کنید"
												name="username"
												required
											/>
										</div>
										<div className="col-md-6">
											<label>
												<b>بیو</b>
											</label>
											<input
												type="text"
												className="text-box"
												placeholder="توضیح کوتاه در مورد خودت"
												name="bio"
												required
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<label>
												<b>عنوان شغلی</b>
											</label>
											<input
												type="text"
												className="text-box"
												placeholder="عنوان شغل تا حد ممکن فارسی"
												name="jobTitle"
												required
											/>
										</div>
										<div className="col-md-6">
											<label>
												<b>عکس پروفایل</b>
											</label>
											<input
												type="url"
												className="text-box right-placeholder"
												placeholder="لینک عکس پروفایل"
												name="profileImgUrl"
												required
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<label>
												<b>رمز عبور</b>
											</label>
											<input
												type="password"
												className="text-box"
												placeholder="رمز وارد کنید"
												name="password"
												onChange={
													this.handleInputChange
												}
												required
											/>
										</div>
										<div className="col-md-6">
											<label>
												<b>تکرار رمز عبور</b>
											</label>
											<input
												type="password"
												className="text-box"
												placeholder="تکرار رمز وارد کنید"
												onChange={
													this.handleInputChange
												}
												name="password_confirm"
												required
											/>
										</div>
									</div>
									<div className="row justify-content-center">
										<div className="col-sm-4">
											<button
												type="submit"
												className="signupbtn register-button">
												ثبت نام
											</button>
										</div>
									</div>
									<div className="center-text py-2">
										قبلا ثبت نام کرده‌اید؟{" "}
										<a href="/login">ورود</a>
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
	password: string;
	password_confirm: string;
}
interface Props {}
