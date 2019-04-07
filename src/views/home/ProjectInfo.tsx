import React, { Component } from "react";
import "src/scss/style.scss";
import "src/views/home/ProjectInfo.scss";
import SkillBox, { SkillBoxType } from "src/views/common/SkillBox";

import AX from "src/views/home/test.png";


export default class ProjectInfo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        return (
            <div className="row project">
                <div className="col-2 pr-3 pl-0">
                    <img src={AX} alt="project image" className="image" />
                </div>
                <div className="col-10 p-0 pr-3">
                    <div className="row m-0">
                        <h5 className="title">وبسایت فروشگاهی مشابه دیجی‌کالا</h5>
                        <p className="time">
                        زمان باقی مانده:۱۷:۲۵
                        </p>
                    </div>
                    <p className="description mb-0">یک فروشگاه اینترنتی با قابلیت مدیریت حرفه‌ای سبد خرید حرفه‌ای مقایسه محصولات ارسال پیامک و ایمیل گزارش گیری جامع قالب...</p>
                    <p className="blue my-1"><b>بودجه: ۲۵۰۰ تومان</b></p>
                    <div>
                        <p className="m-0 skills-color">
                            مهارت‌ها:
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

interface Props { }
interface State { }
