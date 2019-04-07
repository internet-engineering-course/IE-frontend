import React, { Component } from "react";
import "src/scss/style.scss";
import "src/views/home/UserInfo.scss";

import AX from "src/views/home/test.png";

export default class UserInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        return (
            <div className="row user">
                <div className="col-4 image-area">
                    <img src={AX} alt="project image" className="user-image" />
                </div>
                <div className="col-8 text-area">
                    <p className="name-color m-0">
                        نوید اکبری
                    </p>
                    <p className="title-color m-0">
                        گیک
                    </p>
                </div>


            </div>
        );
    }
}

interface Props { }
interface State { }
