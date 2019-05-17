import React, { Component } from "react";
import "src/scss/style.scss";
import "src/views/home/UserInfo.scss";
import { User } from "src/api/UserAPI"
import ProfilePhoto from "src/resources/img/profile.jpg";
export default class UserInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        return (
            <div className="row user" onClick={this.props.onUserClick}>
                <div className="col-4 image-area">
                    <img src={this.props.user.imageUrl} alt="project image" className="user-image" />
                </div>
                <div className="col-8 text-area">
                    <p className="name-color m-0">
                       {this.props.user.firstname + this.props.user.lastname}
                    </p>
                    <p className="title-color m-0">
                        {this.props.user.jobTitle}
                    </p>
                </div>


            </div>
        );
    }
}

interface Props { 
    user: User;
    key: string;
    onUserClick?(): void;
}
interface State { }
