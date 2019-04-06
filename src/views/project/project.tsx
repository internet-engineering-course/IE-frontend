import React, { Component } from 'react';
import Header from 'src/views/common/Header.tsx';
import Footer from 'src/views/common/Footer.tsx';
import Bar from "src/views/common/bar/Bar.tsx";
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
                skills: {}
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
        console.log(this.state.project.budget);
        const timeToDeadline = new Date(Date.now() - this.state.project.deadline);

        return (
            <div>
                <Header isUserLoggedIn={true} />
                <main>
                    <Bar height={'100px'} />
                    <div className="container">
                        <div className="background row">
                            <div className="col-md-3">
                                <img src={this.state.project.imageUrl} alt="project image" className="project-image" />
                            </div>
                            <div className="col-md-9 text-margin">
                                <div>
                                    <h2>{this.state.project.title}</h2>
                                </div>
                                <div className="my-3">
                                    <Flaction flacColor={"gray"} flacType={"flaticon-deadline"} text={"زمان باقی‌مانده: " + timeToDeadline.getDay() + " روز " + timeToDeadline.getHours() + " ساعت " + timeToDeadline.getMinutes() + " دقیقه " + timeToDeadline.getSeconds() + " ثانیه "}></Flaction>
                                    {/* <Flaction flacColor={"red"} flacType={"flaticon-deadline"} text={"مهلت تمام شده"}></Flaction> */}
                                    <Flaction flacColor={"blue"} flacType={"flaticon-money-bag"} text={"بودجه:" + this.state.project.budget + " تومان"}></Flaction>
                                    {/* <Flaction flacColor={"green"} flacType={"flaticon-check-mark"} text={"برنده: وحید محمدی"}></Flaction> */}
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
                            <div className="container project-skill ">
                                <div className="row">
                                    <div className="dashed-line"></div>
                                </div>
                            </div>
                        </div>
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