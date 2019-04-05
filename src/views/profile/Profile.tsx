import React, { Component, FormEvent, ChangeEvent } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import Bar from "src/views/common/bar/Bar";
import SkillBox, { SkillBoxType } from "src/views/profile/SkillBox";
import SelectInput from "src/views/common/input/SelectInput";
import ProfilePhoto from "src/resources/img/profile.jpg";
import "./Profile.css";
import { DEFAULT_USER_ID } from "src/constants/constants.ts";
import { getAllSkills, Skill } from "src/api/SkillAPI";
import {
	getUser,
	addUserSkill,
	deleteUserSkill,
	endorseUserSkill,
	User
} from "src/api/UserAPI";

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
			skillSelectOptions: []
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
				const allSkills = res.data.map((skill: Skill) => {
					return skill.name;
				});
				this.setState({ skillSelectOptions: allSkills });
			})
			.catch(error => console.error(error));
	}

	submitAddSkill = (skillName: string) => {
		addUserSkill(skillName)
			.then(res => {
				this.setState({ user: res.data });
			})
			.catch(error => console.error(error));
	};

	render() {
		const { user } = this.state;
		const loadSelfPage: boolean = DEFAULT_USER_ID == user.id;
		const skillBoxes = user.skills.map(skill => {
			if (loadSelfPage) {
				skill.type = SkillBoxType.Removable
			} else if (skill.type == undefined) {
				skill.type = SkillBoxType.Endorsable
			}
			return (
				<SkillBox
					skill={skill}
					onPointsClick={() => {
						if (skill.type == SkillBoxType.Removable) {
							deleteUserSkill(skill.name)
								.then(res => {
									this.setState({ user: res.data });
								})
								.catch(error => console.error(error));
						} else if (skill.type == SkillBoxType.Endorsable) {
							endorseUserSkill(skill.name, user.id)
								.then(res => {
									skill.point = skill.point + 1;
									skill.type = SkillBoxType.Endorsed;
									this.setState({user: user})
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
			addSkillFrom = (
				<SelectInput
					options={this.state.skillSelectOptions}
					label={"مهارت‌ها:"}
					defaultOption={"--انتخاب مهارت--"}
					onSubmit={this.submitAddSkill}
				/>
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

interface State {
	user: User;
	skillSelectOptions: string[];
}
