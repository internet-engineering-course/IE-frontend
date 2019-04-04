import React, { Component } from "react";
import "./SkillBox.css";
export default class SkillBox extends Component<Props, State> {
	render() {
		var skillPointsClassName;
		switch (this.props.type) {
			case SkillBoxType.Endorsable:
				skillPointsClassName = "point-blue green-hover point-box";
				break;

			case SkillBoxType.Removable:
				skillPointsClassName = "point-blue red-hover point-box";
				break;

			case SkillBoxType.Endorsed:
				skillPointsClassName = "point-green point-box";
				break;

			default:
				break;
		}

		return (
			<div className="col-auto">
				<div className="skill-box">
					<div className="row no-gutters align-items-center">
						<div className="col-auto">
							<span className="skill-text">
								{this.props.skillName}
							</span>
						</div>
						<div className="col-auto ">
							<span className={skillPointsClassName}>
								{this.props.skillPoints}
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
	Endorsed
}

interface Props {
	skillName: string;
	skillPoints: number;
	type: SkillBoxType;
}

interface State {}
