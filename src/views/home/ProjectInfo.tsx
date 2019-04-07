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
                <div className="col-md-2">
                    <img src={AX} alt="project image" className="image" />
                </div>
                <div className="col-md-10 py-1 px-2">
                <div>
                    <h5>وبسایت فروشگاهی مشابه دیجی‌کالا</h5>
                    زمان باقی مانده
                </div>
                    <p className="description mb-0">یک فروشگاه اینترنتی با قابلیت مدیریت حرفه‌ای سبد خرید حرفه‌ای مقایسه محصولات ارسال پیامک و ایمیل گزارش گیری جامع قالب...</p>
                    <p className="blue"><b>بودجه: ۲۵۰۰ تومان</b></p>
                    <div>
                        <p>
                            مهارت‌ها
                        </p>
                        
                    </div>
                </div>
            </div>
        );
    }
}

interface Props { }
interface State { }
