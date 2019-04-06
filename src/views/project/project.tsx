import React, { Component } from 'react';

import Header from 'src/views/common/Header.tsx';
import Footer from 'src/views/common/Footer.tsx';
import Bar from "src/views/common/bar/Bar.tsx";
import SkillBox, { SkillBoxType } from 'src/views/common/SkillBox';
import 'src/scss/style.scss';
import 'src/views/project/project.scss';
import axios from 'axios';
import Flaction from './Flaction';

axios.defaults.baseURL = 'http://localhost:8080';

export default class project extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            description: "",
            imageUrl: "",
            budget: 0,
            deadline: 0,
            skills: {},
            error: ""
        }
    }

    componentDidMount = () => {
        axios.get(`/project`)
            .then(res => {
                this.setState({
                    id: res.data[1].id,
                    title: res.data[1].title,
                    description: res.data[1].description,
                    imageUrl: res.data[1].imageUrl,
                    budget: res.data[1].budget,
                    deadline: res.data[1].deadline,
                    skills: res.data[1].skills
                });
            })
            .catch(error => this.setState({ error }))
    }

    render() {
        const timeToDeadline = new Date(Date.now() - this.state.deadline);

        return (
            <div>
                <Header isUserLoggedIn={true} />
                <main>
                    <Bar height={'100px'} />
                    <div className="container">
                        <div className="background row">
                            <div className="col-md-3">
                                <img src={this.state.imageUrl} alt="project image" className="project-image" />
                            </div>
                            <div className="col-md-9 text-margin">
                                <div>
                                    <h2>{this.state.title}</h2>
                                </div>
                                <div className="my-3">
                                    <Flaction flacColor={"gray"} flacType={"flaticon-deadline"} text={"زمان باقی‌مانده: " + timeToDeadline.getDay() + " روز " + timeToDeadline.getHours() + " ساعت " + timeToDeadline.getMinutes() + " دقیقه " + timeToDeadline.getSeconds() + " ثانیه "}></Flaction>
                                    {/* <Flaction flacColor={"red"} flacType={"flaticon-deadline"} text={"مهلت تمام شده"}></Flaction> */}
                                    <Flaction flacColor={"blue"} flacType={"flaticon-money-bag"} text={"بودجه:" + this.state.budget + " تومان"}></Flaction>
                                    {/* <Flaction flacColor={"green"} flacType={"flaticon-check-mark"} text={"برنده: وحید محمدی"}></Flaction> */}
                                </div>
                                <div className="my-3">
                                    <h5>توضیحات</h5>
                                </div>
                                <div>
                                    <p>
                                        {this.state.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container project-skill ">
                        <div className="row">
                            <div className="dashed-line"></div>
                        </div>
                        <div className="py-4 px-4">
                            <div className="make-rtl row">
                                <div className="blue-color">
                                    <h5>مهارت‌های لازم:</h5>
                                </div>
                            </div>
                            <div className="make-ltr">
                                <div className="row">
                                    <SkillBox
                                        skillName={"HTML"}
                                        skillPoints={5}
                                        type={SkillBoxType.Endorsable}
                                    />
                                    <SkillBox
                                        skillName={"CSS"}
                                        skillPoints={3}
                                        type={SkillBoxType.Endorsed}
                                    />
                                    <SkillBox
                                        skillName={"JavaScript"}
                                        skillPoints={16}
                                        type={SkillBoxType.Endorsed}
                                    />
                                    <SkillBox
                                        skillName={"TypeScript"}
                                        skillPoints={2}
                                        type={SkillBoxType.Removable}
                                    />
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

interface Props { };
interface State {
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    budget: number,
    deadline: number,
    skills: {},
    error: string
};