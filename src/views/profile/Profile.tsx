import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import Bar from "src/views/common/bar/Bar";
import SkillBox, { SkillBoxType } from "src/views/profile/SkillBox";
import ProfilePhoto from "src/resources/img/profile.jpg";
import "./Profile.css";
import axios from "axios";

export default class Profile extends Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			user: {
				id: 1,
				username: "ali",
				firstname: "علی",
				lastname: "شریف زاده",
				jobTitle: "برنامه نویس وب",
				bio:
					"روی سنگ قبرم بنویسید: خدا بیامرز میخواست خیلیکارا بکنه ولی پول نداشت",
				skills: [
					{
						name: "HTML",
						point: 5
					}
				]
			},
			allSkills: [
				{
					name: "Python",
					point: 0
				}
			]
		};
	}

	componentDidMount() {
		const {
			match: { params }
		} = this.props;

		axios
			.get("/user/" + params.userId)
			.then(res => {
				this.setState({
					user: {
						id: res.data.id,
						username: res.data.username,
						firstname: res.data.firstname,
						lastname: res.data.lastname,
						jobTitle: res.data.jobTitle,
						bio: res.data.bio,
						skills: res.data.skills
					}
				});
			})
			.catch(error => console.log(error));
		axios
			.get("/skill")
			.then(res => {
				this.setState({
					allSkills: res.data
				});
			})
			.catch(error => console.log(error));
	}

	render() {
		const { user } = this.state;
		const skillBoxes = user.skills.map(skill => {
			return (
				<SkillBox
					skillName={skill.name}
					skillPoints={skill.point}
					type={SkillBoxType.Removable}
					key={skill.name}
				/>
			);
		});
		const addSkillOptions = this.state.allSkills.map((skill, index) => {
			return (
				<option value={index + 1} key={skill.name}>
					{skill.name}
				</option>
			);
		});

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
								<h2>
									{user.firstname} {user.lastname}
								</h2>
								<p style={{ color: "#787878" }}>
									{user.jobTitle}
								</p>
							</div>
						</div>
						<div className="row">
							<span className="profile-paragraph">
								{user.bio}
							</span>
						</div>
						<div className="make-rtl mx-3 mb-3">
							<div className="row">
								<h4 className="px-3 py-2">مهارت‌ها:</h4>
								<form>
									<select title="skillName" name="skillName">
										<option value="0">
											--انتخاب مهارت--
										</option>
										{addSkillOptions}
									</select>
									<input
										type="submit"
										className="form-input"
										value="افزودن مهارت"
									/>
								</form>
							</div>
						</div>
						<div className="make-ltr">
							<div className="row justify-content-start no-gutters">
								{skillBoxes}
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		);
	}
}

interface Skill {
	name: string;
	point: number;
}

interface User {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
	jobTitle: string;
	bio: string;
	skills: Skill[];
}

interface State {
	user: User;
	allSkills: Skill[];
}
