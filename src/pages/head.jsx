import React from 'react';

import SideDrawer from  '../components/sideDrawer/sideDrawer';
import '../css/main.css';

export default class Head extends React.Component {
	constructor(props) {
		super(props)
		 this.state = { showDrawer:false}
	}

	openDrawerToggle = (e) => {
		if (e.target && e.target.matches('.header_menu_btn')) {
			this.setState((prevState) => {
				return {showDrawer: !prevState.showDrawer};
			})
		}
  	}

	render() {
		return (
			<div className="header_mod">
	          <div className="header_logo"></div>
	          <div className="header_menu_btn" onClick={this.openDrawerToggle.bind(this)}>
	           <SideDrawer show={this.state.showDrawer} />
	           </div>          
	        </div>
		);
	}
}