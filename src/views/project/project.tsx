import React, { Component } from 'react';
import Header from 'src/views/common/Header.tsx';
import Footer from 'src/views/common/Footer.tsx';
import Bar from "src/views/common/bar/Bar.tsx";
import SkillBox, { SkillBoxType } from "src/views/common/SkillBox";
import 'src/scss/style.scss';
import 'src/views/project/project.scss';
import axios from 'axios';
import {
    Project,
    getProject
} from 'src/api/ProjectAPI';
import Flaction from './Flaction';

axios.defaults.baseURL = 'http://localhost:8080';

export default class project extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            project: {
                id: "untitled",
                title: "untitled",
                description: "untitled",
                imageUrl: "untitled",
                budget: 0,
                deadline: 0,
                skills: [
                    {
                        name: "untitled",
                        point: 0
                    }
                ]
            },
            error: ""
        }
    }

    componentDidMount = () => {
        const {
            match: { params }
        } = this.props;

        getProject(params.projectId)
            .then(res => {
                this.setState({ project: res.data });
            })
            .catch(error => console.error(error));

    }

    render() {

        const timeToDeadline = new Date(Date.now() - this.state.project.deadline);

        const skillBoxes = this.state.project.skills.map(skill => {
            skill.type = SkillBoxType.Simple;
            return (
                <SkillBox
                    skill={skill}
                    key={skill.name}
                />
            );
        });

        return (
            <div>
                {/* TODO: edit user log in */}
                <Header isUserLoggedIn={true} />
                <main>
                    <Bar height={'100px'} />
                    <div className="container">
                        <div className="background row">
                            <div className="col-md-3">
                                <img src={this.state.project.imageUrl} alt="project image" className="project-image" />
                            </div>
                            <div className="col-md-9 text-margin">
                                <h2>{this.state.project.title}</h2>
                                <div className="my-3">
                                    {/* TODO: edit flaction to work with deadlines */}
                                    <Flaction flacColor={"gray"} bold={true} flacType={"flaticon-deadline"} text={"زمان باقی‌مانده: " + timeToDeadline.getDay() + " روز " + timeToDeadline.getHours() + " ساعت " + timeToDeadline.getMinutes() + " دقیقه " + timeToDeadline.getSeconds() + " ثانیه "}></Flaction>
                                    {/* <Flaction flacColor={"red"} bold={true} flacType={"flaticon-deadline"} text={"مهلت تمام شده"}></Flaction> */}
                                    <Flaction flacColor={"blue"} bold={true} flacType={"flaticon-money-bag"} text={"بودجه:" + this.state.project.budget + " تومان"}></Flaction>
                                    {/* <Flaction flacColor={"green"} bold={true} flacType={"flaticon-check-mark"} text={"برنده: وحید محمدی"}></Flaction> */}
                                </div>
                                <div className="my-3">
                                    <h5>توضیحات</h5>
                                </div>
                                <div>
                                    <p>
                                        {this.state.project.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container project-skill">
                        <div className="row">
                            <div className="dashed-line"></div>
                        </div>
                        <div className="py-4 px-4">
                            <div className="make-rtl row blue-color">
                                <h5>مهارت‌های لازم:</h5>
                            </div>
                            <div className="make-ltr">
                                <div className="row no-gutters">
                                    {skillBoxes}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container bid-container py-4">
                    {/* TODO: chech user is bid or not and send bid to server */}
                        <Flaction flacColor={"green"} bold={false} flacType={"flaticon-check-mark"} text={ "شما قبلا پیشنهاد خود را ثبت کرده‌اید."}></Flaction>
                        {/* <div className="row mx-3">
                            <span className="mt-2">
                                <h5>ثبت پیشنهاد</h5>
                            </span>
                        </div>
                        <div className="row mr-2">
                            <form className="form-inline">
                                <div className="form-group input-border mr-1">
                                    <input type="number" placeholder="پیشنهاد خود را وارد کنید" />
                                    <span className="input-color">تومان</span>
                                </div>
                                    <button type="submit" className="button mr-2">ارسال</button>
                            </form>
                        </div> */}
                        {/* <Flaction flacColor={"red"} bold={false} flacType={"flaticon-danger"} text={ "مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!"}></Flaction> */}
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

interface Props {
    match: any
};
interface State {
    project: Project;
    error: string;
};