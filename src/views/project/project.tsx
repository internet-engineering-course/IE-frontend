import React, { Component } from 'react';
import Header from 'src/views/common/Header.tsx';
import Footer from 'src/views/common/Footer.tsx';
import Bar from "src/views/common/bar/Bar.tsx";
import SkillBox, { SkillBoxType } from "src/views/common/SkillBox";
import 'src/scss/style.scss';
import 'src/views/project/project.scss';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {
    Project,
    getProject,
    bidProject,
    isBidBefore
} from 'src/api/ProjectAPI';
import Flaction from './Flaction';

axios.defaults.baseURL = 'http://localhost:8080';

export default class project extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            bidAmount: -1,
            isBid: false,
            timeToDeadline: new Date(),
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
                this.setState({timeToDeadline: new Date(this.state.project.deadline - Date.now())})
            })
            .catch(error => toast.warn(error.response.data));

        isBidBefore(params.projectId)
            .then(res =>{
                if(res.data == true){
                    this.setState({isBid:true});
                }
            })
            .catch(error => toast.warn(error.response.data));

    }

    bidProject: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = event => {
        bidProject(this.state.project.id, this.state.bidAmount)
            .then(res => {
                toast.success("you successfully bid project with " + this.state.bidAmount + " amount");
                this.setState({ isBid: true });
            })
            .catch(error => toast.warn(error.response.data));
        event.preventDefault();
    }

    updateInput: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
        this.setState({ bidAmount: event.target.valueAsNumber });
    };

    render() {
        

        const skillBoxes = this.state.project.skills.map(skill => {
            skill.type = SkillBoxType.Simple;
            return (
                <SkillBox
                    skill={skill}
                    key={skill.name}
                />
            );
        });

        var bidContainer = null;
        if (!this.state.isBid) {
            bidContainer = (
                <div>
                    <div className="row mx-3">
                        <span className="mt-2">
                            <h5>ثبت پیشنهاد</h5>
                        </span>
                    </div>
                    <div className="row mr-2">
                        <form className="form-inline">
                            <div className="form-group input-border mr-1">
                                <input type="number" placeholder="پیشنهاد خود را وارد کنید" onChange={this.updateInput} />
                                <span className="input-color">تومان</span>
                            </div>
                            <button className="button mr-2" onClick={this.bidProject}>ارسال</button>
                        </form>
                    </div>
                </div>
            );
        } else {
            bidContainer = (
                <div>
                    <Flaction flacColor={"green"} bold={false} flacType={"flaticon-check-mark"} text={ "شما قبلا پیشنهاد خود را ثبت کرده‌اید."}></Flaction>
                </div>
            );
        }

        return (
            <div>
                <Header isUserLoggedIn={true} />
                <main>
                    <Bar height={'100px'} />
                    <div className="container">
                        <div className="background row">
                            <div className="col-md-3 image-area mt-4">
                                <img src={this.state.project.imageUrl} alt="project image" className="project-image" />
                            </div>
                            <div className="col-md-9 text-margin">
                                <h2>{this.state.project.title}</h2>
                                <div className="my-3">
                                    {/* TODO: edit flaction to work with deadlines */}
                                    <Flaction flacColor={"gray"} bold={true} flacType={"flaticon-deadline"} text={"زمان باقی‌مانده: " + this.state.timeToDeadline.getDay() + " روز " + this.state.timeToDeadline.getHours() + " ساعت " + this.state.timeToDeadline.getMinutes() + " دقیقه " + this.state.timeToDeadline.getSeconds() + " ثانیه "}></Flaction>
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
                        {bidContainer}
                        {/* <Flaction flacColor={"red"} bold={false} flacType={"flaticon-danger"} text={ "مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!"}></Flaction> */}
                    </div>
                </main>
                <Footer />
                <ToastContainer />
            </div>
        )
    }
}

interface Props {
    match: any;
};
interface State {
    project: Project;
    error: string;
    bidAmount: number;
    isBid: boolean;
    timeToDeadline: Date;
};