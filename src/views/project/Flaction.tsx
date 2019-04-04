import React, { Component } from 'react'
import { Interface } from 'readline';
import "src/views/project/Flaction.scss"

export default class Flaction extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        document.documentElement.style.setProperty(
            "--flacColor",
            this.props.flacColor
        );
        return (
            <div className="color">
                <ul className="unorder-list">
                    <li><i className={this.props.flacType}></i></li>
                    <li>
                        <p>
                            <b>
                                {this.props.text}
                            </b>
                        </p>
                    </li>
                </ul>
            </div>
        )
    }
}

interface State {}
interface Props {
    flacColor: string,
    flacType:string,
    text:string
}