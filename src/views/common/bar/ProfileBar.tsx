import React, { Component } from 'react'
import './ProfileBar.css'

export default class ProfileBar extends Component {
  render() {
	return (
		<div className="container h-100">
			<div className="row h-100 align-items-end no-gutters">
				<div className="col-auto">
					<span className="profile-bar dark-bar"></span>
				</div>
			</div>
		</div>
	)
  }
}
