import React, { Component } from "react";
import "./SkillBox.css";
import { Skill } from "src/api/SkillAPI";
export default class SkillBox extends Component<Props, State> {
	render() {
		var skillPointsClassName, skillBoxClassName = "";
		var showPoints = true;
		switch (this.props.skill.type) {
			case SkillBoxType.Endorsable:
				skillPointsClassName = "point-blue green-hover point-box";
				skillBoxClassName = "skill-box";
				break;

			case SkillBoxType.Removable:
				skillPointsClassName = "point-blue red-hover point-box";
				skillBoxClassName = "skill-box";
				break;

			case SkillBoxType.Endorsed:
				skillPointsClassName = "point-green point-box";
				skillBoxClassName = "skill-box";
				break;

			case SkillBoxType.Simple:
				skillPointsClassName = "point-blue point-box";
				skillBoxClassName = "skill-box";
				break;

			case SkillBoxType.None:
				skillPointsClassName = "";
				skillBoxClassName = "skill-box gray-background";
				showPoints = false;
				break;

			default:
				break;
		}

		return (
			<div className="col-auto">
				<div className={skillBoxClassName}>
					<div className="row no-gutters align-items-center">
						<div className="col-auto">
							<span className="skill-text">
								{this.props.skill.name}
							</span>
						</div>
						
						<div
							className="col-auto"
							onClick={this.props.onPointsClick}>
							<span className={skillPointsClassName}>
								{showPoints ? this.props.skill.point:""}
							</span>
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
