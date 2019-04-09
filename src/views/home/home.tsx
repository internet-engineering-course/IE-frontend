import React, { Component } from 'react';

import Header from 'src/views/common/Header.tsx';
import Footer from 'src/views/common/Footer.tsx';
import Bar from "src/views/common/bar/Bar.tsx";
import ProjectInfo from "src/views/home/ProjectInfo.tsx";
import UserInfo from "src/views/home/UserInfo.tsx";
import "src/scss/style.scss";
import "src/views/home/home.scss";
import { Project, getAllProjects } from "src/api/ProjectAPI";
import { ToastContainer, toast } from 'react-toastify';
export default class home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      projects:[]
    }
  }

  componentDidMount() {
    getAllProjects().then(res => {
      console.log(res);
      this.setState({ projects: res.data });
    }).catch(error => toast.warn(error.response.data));
  }

  render() {
    // console.log(this.state.projects[2]);
    const AllProjects = this.state.projects.map(project => {
      return (
        <ProjectInfo project={project} key={project.id}/>
      );
    });
    // TODO: get user and project data from server and add skill of project
    return (
      <div>
        <Header isUserLoggedIn={true} />
        <main>
          <Bar height={'250px'}>
            <div className="container">
              <h2 className="header-margin">
                <b className="blue-color">
                  جاب‌اونجا خوب است!
                  </b>
              </h2>
              <div className="pr-4 text-style">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
              </div>
              <div className="row search">
                <input className="search-input" type="search" placeholder="جستجو در جاب‌اونجا" />
                <button type="submit" className="search-button">جستجو</button>
              </div>
            </div>
          </Bar>
          <div className="container main">
            <div className="users">
              <div className="user-search">
                <input className="user-search-input" type="search" placeholder="جستجو نام کاربر" />
              </div>
              <div>
                <UserInfo></UserInfo>
                <UserInfo></UserInfo>
                <UserInfo></UserInfo>
                <UserInfo></UserInfo>
              </div>
            </div>
            <div className="projects">
              {AllProjects}
            </div>

          </div>

        </main>
        <Footer />
        <ToastContainer />
      </div>
    )
  }
}

interface Props { }
interface State {
  projects: Project[];
}
