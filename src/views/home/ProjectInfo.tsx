import React, { Component } from "react";
import "src/scss/style.scss";
import "src/views/home/ProjectInfo.scss";
import SkillBox, { SkillBoxType } from "src/views/common/SkillBox";
import { Project } from 'src/api/ProjectAPI';


export default class ProjectInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        const skillBoxes = this.props.project.skills.map(skill => {
            skill.type = SkillBoxType.None;
            return (
                <SkillBox
                    skill={skill}
                    key={skill.name}
                />
            );
        });

        return (
            <div className="row project">
                <div className="col-2 pr-3 pl-0">
                    <img src={this.props.project.imageUrl} alt="project image" className="image" />
                </div>
                <div className="col-10 p-0 pr-3">
                    <div className="row m-0">
                        <h5 className="title">{this.props.project.title}</h5>
                        <p className="time">
                            زمان باقی مانده:۱۷:۲۵
                        </p>
                    </div>
                    <p className="description mb-0">{this.props.project.description}</p>
                    <p className="blue my-1"><b>بودجه: {this.props.project.budget}</b></p>
                    <div className="row no-gutters">
                        <p className="my-2 skills-color">
                            مهارت‌ها:
                        </p>
                        {skillBoxes}
                    </div>
                </div>
            </div>
        );
    }
}

interface Props {
    project: Project;
    key: string;
}
interface State { }
