import React, { Component } from 'react'
import 'src/views/common/Background.scss'
import 'src/scss/style.scss'

export default class Background extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const blueBackgroundHeight: string = this.props.blueBackgroundHeight;
        console.log(blueBackgroundHeight);
        document.documentElement.style.setProperty('--Height' , blueBackgroundHeight);

        return (
            <main>
                <section className="background-blue" />
            </main>
        );
    }
}

interface Props {
    blueBackgroundHeight: string
}
interface State { }