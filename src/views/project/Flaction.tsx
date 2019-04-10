import React, { Component } from 'react'
import "src/views/project/Flaction.scss"

export default class Flaction extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        var textArea = null;
        if (this.props.bold) {
            textArea = (
                <p>
                    <b>
                        {this.props.text}
                    </b>
                </p>);
        } else {
            textArea = (
                <p>
                    {this.props.text}
                </p>);
        }
        return (
            <div className={this.props.flacColor}>
                <ul className="unorder-list">
                    <li><i className={this.props.flacType}></i></li>
                    <li>{textArea}</li>
                    <li className="flaction-text-margin mb-0 mr-0">{this.props.children}</li>
                </ul>
            </div>
        )
    }
}

interface State { }
interface Props {
    flacColor: string,
    flacType: string,
    text: string,
    bold: boolean
}