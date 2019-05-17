import React, { Component, FormEvent, ChangeEvent } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import Bar from "src/views/common/bar/Bar";
import SkillBox, { SkillBoxType } from "src/views/common/SkillBox";
import SelectInput from "src/views/common/input/SelectInput";
import ProfilePhoto from "src/resources/img/profile.jpg";
import { ToastContainer, toast } from 'react-toastify';
import {parseJwt} from "src/utils/parseJwt";

import "./Profile.scss";

import { getAllSkills, Skill, EndorsableSkill } from "src/api/SkillAPI";
import {
	getUser,
	addUserSkill,
	deleteUserSkill,
	getEndorsableSkills,
	endorseUserSkill,
	User
} from "src/api/UserAPI";
import { render } from "react-dom";

export default class Profile extends Component<Props, State> {
	constructor(props: Props) {
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
			skillSelectOptions: [],
			endorsableSkills: []
		};
	}

	componentDidMount() {
		const {
			match: { params }
		} = this.props;

		getUser(params.username)
			.then(res => {
				this.setState({ user: res.data });
			})
			.catch(error => toast.warn(error.response.data));

		getAllSkills()
			.then(res => {
				const allSkills = res.data.map((skill: Skill) => {
					return skill.name;
				});
				this.setState({ skillSelectOptions: allSkills });
			})
			.catch(error => toast.warn(error.response.data));

		getEndorsableSkills(params.username)
			.then(res => {
				this.setState({ endorsableSkills: res.data });
			})
			.catch(error => toast.warn(error.response.data));
	}

	submitAddSkill = (skillName: string) => {
		addUserSkill(skillName)
			.then(res => {
				this.setState({ user: res.data });
			})
			.catch(error => toast.warn(error.response.data));
	};
	
	render() {
		var token = localStorage.getItem('token');
		var loginUser;
		if(token != null){
			loginUser = parseJwt(token).iss;
		}
		const { user } = this.state;
		const loadSelfPage: boolean = loginUser == user.username;
		const skills = loadSelfPage
			? user.skills.map(skill => {
					return { skill: skill, endorsable: false };
			  })
			: this.state.endorsableSkills;
		const skillBoxes = skills.map(eSkill => {
			const skill = eSkill.skill;
			if (loadSelfPage) {
				skill.type = SkillBoxType.Removable;
			} else if (eSkill.endorsable) {
				skill.type = SkillBoxType.Endorsable;
			} else {
				skill.type = SkillBoxType.Endorsed;
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
							endorseUserSkill(skill.name, user.username)
								.then(res => {
									skill.point = skill.point + 1;
									skill.type = SkillBoxType.Endorsed;
									eSkill.endorsable = false;
									this.setState({ user: user });
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
				<ToastContainer/>
			</div>
			
		);
	}
}

interface Props {
	match: any;
}

interface State {
	user: User;
	skillSelectOptions: string[];
	endorsableSkills: EndorsableSkill[];
}
