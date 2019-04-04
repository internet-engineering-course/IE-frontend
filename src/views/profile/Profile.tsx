import React, { Component } from "react";
import Header from "src/views/common/Header";
import Footer from "src/views/common/Footer";
import Bar from "src/views/common/bar/Bar";
import SkillBox, {SkillBoxType} from "src/views/profile/SkillBox";
import ProfilePhoto from "src/resources/img/profile.jpg";
import "./Profile.css";

export default class Profile extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Header isUserLoggedIn={true} />
				<main>
					<Bar height={"150px"}>
						<div className="container h-100">
							<div className="row h-100 align-items-end no-gutters">
								<div className="col-auto">
									<span className="profile-bar dark-bar" />
								</div>
							</div>
						</div>
					</Bar>
					<section className="container">
						<div className="row align-items-center">
							<div className="col-auto">
								<div className="profile-border">
									<img
										src={ProfilePhoto}
										alt="Profile Photo"
										className="profile-image"
									/>
								</div>
							</div>
							<div className="col-auto">
								<h2>نوید اکبری</h2>
								<p style={{ color: "#787878" }}>دانشجو</p>
							</div>
						</div>
						<div className="row">
							<span className="profile-paragraph">
								لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
								صنعت چاپ و با استفاده از طراحان گرافیک است.
								چاپگرها و متون بلکه روزنامه و مجله در ستون و
								سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
								مورد نیاز و کاربردهای متنوع با هدف بهبود
								ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و
								سه درصد گذشته، حال و آینده شناخت فراوان جامعه و
								متخصصان را می طلبد تا با نرم افزارها شناخت
								بیشتری را برای طراحان رایانه ای علی الخصوص
								طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد
								کرد. در این صورت می توان امید داشت که تمام و
								دشواری موجود در ارائه راهکارها و شرایط سخت تایپ
								به پایان رسد وزمان مورد نیاز شامل حروفچینی
								دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل
								دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
							</span>
						</div>
						<div className="make-ltr">
							<div className="row justify-content-start no-gutters">
								<SkillBox skillName={'HTML'} skillPoints={5} type={SkillBoxType.Endorsable} />
								<SkillBox skillName={'CSS'} skillPoints={3} type={SkillBoxType.Endorsed} />
								<SkillBox skillName={'JavaScript'} skillPoints={16} type={SkillBoxType.Endorsed} />
								<SkillBox skillName={'TypeScript'} skillPoints={2} type={SkillBoxType.Removable}/>
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		);
	}
}

interface Props {}
interface State {}
