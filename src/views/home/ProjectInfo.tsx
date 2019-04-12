import React, { Component } from "react";
import "src/scss/style.scss";
import "src/views/home/ProjectInfo.scss";
import SkillBox, { SkillBoxType } from "src/views/common/SkillBox";
import { Project } from 'src/api/ProjectAPI';
import { ToPersian } from "src/utils/converNumberToPersian.ts";
import { ToTimeShort } from "src/utils/converToTime";

export default class ProjectInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        var timeToDeadline:Date = new Date();
        var deadlineIsReceived: boolean = false;
        if (this.props.project.deadline - Date.now() > 0) {
            timeToDeadline = new Date(this.props.project.deadline - Date.now());
        } else {
            deadlineIsReceived = true;
        }
        var timeArea = null;

        if (deadlineIsReceived) {
            timeArea = (
                <p className="time time-background">
                    مهلت تمام شده
                </p>
            );
        } else {
            timeArea = (
                <p className="time">
                    زمان باقی مانده:{ToTimeShort(timeToDeadline)}
                </p>
            );
        }

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
            <div className="row project" onClick={this.props.onProjectClick}>
                <div className="col-2 pr-3 pl-0">
                    <img src={this.props.project.imageUrl} alt="project image" className="image" />
                </div>
                <div className="col-10 p-0 pr-3">
                    <div className="row m-0">
                        <h5 className="title m-0">{this.props.project.title}</h5>
                        {timeArea}
                    </div>
                    <p className="description mb-0">{this.props.project.description}</p>
                    <p className="blue budget my-1"><b>بودجه: {ToPersian(this.props.project.budget)} تومان</b></p>
                    <div className="row no-gutters">
                        <p className="my-1 skills-color">
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
    onProjectClick?(): void;
}
interface State { }
