import React, { Component } from 'react';

import Header from 'src/views/common/Header.tsx';
import Footer from 'src/views/common/Footer.tsx';
import Bar from "src/views/common/bar/Bar.tsx";
import ProjectInfo from "src/views/home/ProjectInfo.tsx";
import UserInfo from "src/views/home/UserInfo.tsx";
import "src/scss/style.scss";
import "src/views/home/home.scss";
import { Project, getAllProjects, searchProject } from "src/api/ProjectAPI";
import { User, getAllUser, searchUser } from "src/api/UserAPI";
import { ToastContainer, toast } from 'react-toastify';
export default class home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      projects: [],
      users: [],
      projectPageNumber: 0,
      searchPageNumber: 0,
      pageSize: 3,
      projectSearchText: "",
      userSearchText: "",
      loadMoreVisibility: true,
      isSearching: false
    }
  }

  componentDidMount() {
    getAllProjects(this.state.pageSize, this.state.projectPageNumber).then(res => {
      this.setState({
        projects: res.data,
        projectPageNumber: this.state.projectPageNumber + 1
      });
    }).catch(error => toast.warn(error.response.data));

    getAllUser().then(res => {
      this.setState({ users: res.data })
    }).catch(error => toast.warn(error.response.data));

    this.loadMore = this.loadMore.bind(this);
    this.projectSearch = this.projectSearch.bind(this);
    this.updateProjectInputValue = this.updateProjectInputValue.bind(this);
    this.userSearch = this.userSearch.bind(this);
  }

  loadMore() {
    if (!this.state.isSearching) {
      getAllProjects(this.state.pageSize, this.state.projectPageNumber).then(res => {
        if (res.data.length < 3) {
          this.setState({ loadMoreVisibility: false });
        } else {
          this.setState({
            loadMoreVisibility: true
          });
        }
        this.setState({
          projects: [...this.state.projects, ...res.data],
          projectPageNumber: this.state.projectPageNumber + 1
        });
      }).catch(error => toast.warn(error.response.data));

    } else {
      this.projectSearch();
    }
  }

  projectSearch() {
    this.setState({ isSearching: true });
    searchProject(this.state.projectSearchText, this.state.pageSize, this.state.searchPageNumber).then(res => {
      if (res.data.length < 3) {
        this.setState({ loadMoreVisibility: false });
      } else {
        this.setState({
          loadMoreVisibility: true
        });
      }
      if (this.state.searchPageNumber == 0) {
        this.setState({
          projects: res.data,
          searchPageNumber: this.state.searchPageNumber + 1
        })
      } else {
        this.setState({
          projects: [...this.state.projects, ...res.data],
          searchPageNumber: this.state.searchPageNumber + 1
        });
      }
    }).catch(error => toast.warn(error.response.data));
  }

  userSearch(evt: any) {
    if (evt.target.value == "") {
      getAllUser().then(res => {
        this.setState({ users: res.data })
      }).catch(error => toast.warn(error.response.data));
    } else {
      searchUser(evt.target.value).then(res => {
        this.setState({
          users: res.data
        })
      }).catch(error => toast.warn(error.response.data));
    }
  }

  updateProjectInputValue(evt: any) {

    if (evt.target.value == '') {
      
      getAllProjects(this.state.pageSize, 0).then(res => {
        if (res.data.length < 3) {
          this.setState({ loadMoreVisibility: false });
        } else {
          this.setState({
            loadMoreVisibility: true
          });
        }
        
        this.setState({
          projects: res.data,
          projectPageNumber: 1
        });
      }).catch(error => toast.warn(error.response.data));
    }else {
      this.setState({
        projectSearchText: evt.target.value,
        searchPageNumber: 0
      });
    }
  }

  render() {
    var LoadMore;
    if (this.state.loadMoreVisibility) {
      LoadMore = (<div className="row justify-content-center">
        <div className="col-sm-2 visibility">
          <button type="submit" onClick={this.loadMore} className="loadMoreBtn">
            نمایش بیشتر
      </button>
        </div>
      </div>);
    } else {
      LoadMore = "";
    }

    const AllProjects = this.state.projects.map(project => {
      return (
        <ProjectInfo project={project} key={project.id} onProjectClick={() => {
          window.location.assign("/project/" + project.id);
        }} />
      );
    });

    const AllUsers = this.state.users.map(user => {
      return (
        <UserInfo user={user} key={user.id.toString()} onUserClick={() => {
          window.location.assign("/profile/" + user.username);
        }} />
      );
    });

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
                <input onChange={(evt) => this.updateProjectInputValue(evt)} className="search-input" type="search" placeholder="جستجو در جاب‌اونجا" />
                <button type="submit" className="search-button" onClick={this.projectSearch}>جستجو</button>
              </div>
            </div>
          </Bar>
          <div className="container main">
            <div className="users col-3">
              <div className="user-search">
                <input onChange={evt => this.userSearch(evt)} className="user-search-input" type="search" placeholder="جستجو نام کاربر" />
              </div>
              <div>
                {AllUsers}
              </div>
            </div>
            <div className="projects">
              {AllProjects}
            </div>
          </div>
          {LoadMore}
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
  users: User[];
  pageSize: number;
  projectPageNumber: number;
  searchPageNumber: number;
  projectSearchText: string;
  userSearchText: string;
  loadMoreVisibility: boolean;
  isSearching: boolean;
}
