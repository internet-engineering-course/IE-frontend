import React, { Component } from "react";
import "./SkillBox.css";
import { Skill } from "src/api/SkillAPI";
export default class SkillBox extends Component<Props, State> {
	render() {
		var skillPointsClassName , skillBackground;
		switch (this.props.skill.type) {
			case SkillBoxType.Endorsable:
				skillPointsClassName = "point-blue green-hover point-box";
				break;

			case SkillBoxType.Removable:
				skillPointsClassName = "point-blue red-hover point-box";
				break;

			case SkillBoxType.Endorsed:
				skillPointsClassName = "point-green point-box";
				break;

			case SkillBoxType.Simple:
				skillPointsClassName = "point-blue point-box";
				break;

			case SkillBoxType.None:
				skillPointsClassName = "";
				skillBackground = "gray-background";
				break;

			default:
				break;
		}

		var Point = null;
		if (!SkillBoxType.None) {
			Point = (<div
				className="col-auto"
				onClick={this.props.onPointsClick}>
				<span className={skillPointsClassName}>
					{this.props.skill.point}
				</span>
			</div>);
		}

		return (
			<div className="col-auto">
				<div className="skill-box">
					<div className="row no-gutters align-items-center">
						<div className="col-auto">
							<span className="skill-text">
								{this.props.skill.name}
							</span>
						</div>
						<div className={skillBackground}>
							{Point}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export enum SkillBoxType {
	Removable,
	Endorsable,
	Endorsed,
	Simple,
	None
}

interface Props {
	skill: Skill;
	onPointsClick?(): void;
}

interface State { }
