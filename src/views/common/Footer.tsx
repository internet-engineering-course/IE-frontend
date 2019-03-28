import React, { Component } from 'react'
import 'src/views/common/Footer.scss'
import 'src/scss/style.scss'

export default class Footer extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="container h-100">
                    <div className="row align-items-center justify-content-center h-100">
                        <div className="col-auto ">
                            <span className="footer-text">
                                &copy; تمامی حقوق این سایت متعلق به جاب‌اونجا می‌باشد
                    </span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

interface Props { }
interface State { }