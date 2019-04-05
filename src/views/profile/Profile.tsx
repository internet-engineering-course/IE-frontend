import React, { Component, FormEvent, ChangeEvent } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import Bar from "src/views/common/bar/Bar";
import SkillBox, { SkillBoxType } from "src/views/profile/SkillBox";
import ProfilePhoto from "src/resources/img/profile.jpg";
import "./Profile.css";
import { DEFAULT_USER_ID } from "src/constants/constants.ts";
import {
	getAllSkills,
	getUser,
	addUserSkill,
	deleteUserSkill
} from "src/api/ProfileAPI";

export default class Profile extends Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			user: {
				id: 0,
				username: "untitled",
				firstname: "untitled",
				lastname: "untitled",
				jobTitle: "untitled",
				bio: "untitled",
				skills: [
					{
						name: "untitled",
						point: 0
					}
				]
			},
			allSkills: [
				{
					name: "untitled",
					point: 0
				}
			],
			selectedSkill: ""
		};
	}

	componentDidMount() {
		const {
			match: { params }
		} = this.props;

		getUser(params.userId)
			.then(res => {
				this.setState({ user: res.data });
			})
			.catch(error => console.error(error));

		getAllSkills()
			.then(res => {
				this.setState({ allSkills: res.data });
			})
			.catch(error => console.error(error));
	}

	submitAddSkill = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addUserSkill(this.state.selectedSkill)
			.then(res => {
				this.setState({ user: res.data });
			})
			.catch(error => console.error(error));
	};

	handleSelectSkill = (event: ChangeEvent<HTMLSelectElement>) => {
		this.setState({ selectedSkill: event.target.value });
	};

	render() {
		const { user } = this.state;
		const loadSelfPage: boolean = DEFAULT_USER_ID == user.id;
		const skillBoxes = user.skills.map(skill => {
			const type = loadSelfPage
				? SkillBoxType.Removable
				: SkillBoxType.Endorsable;
			return (
				<SkillBox
					skillName={skill.name}
					skillPoints={skill.point}
					type={type}
					onPointsClick={() => {
						if (type == SkillBoxType.Removable) {
							deleteUserSkill(skill.name)
								.then(res => {
									this.setState({ user: res.data });
								})
								.catch(error => console.error(error));
						}
					}}
					key={skill.name}
				/>
			);
		});
		var addSkillFrom = null;
		if (loadSelfPage) {
			const addSkillOptions = this.state.allSkills.map(skill => {
				return (
					<option value={skill.name} key={skill.name}>
						{skill.name}
					</option>
				);
			});
			addSkillFrom = (
				<div className="make-rtl mx-3 mb-3">
					<div className="row">
						<h4 className="px-3 py-2">مهارت‌ها:</h4>
						<form onSubmit={this.submitAddSkill}>
							<select
								title="skillName"
								name="skillName"
								onChange={this.handleSelectSkill}>
								<option value="0">--انتخاب مهارت--</option>
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
			);
		}

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
						{addSkillFrom}
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
	selectedSkill: string;
}
