import React from 'react';
import {Route,Switch} from "react-router-dom"
import Header from './head.jsx'

import Home from "./home.jsx";
import Account from './account.jsx';
import Rules from './rules.jsx';
import How from './how.jsx';
// import About from './about.jsx';
import Test from './test.jsx'

// 
export const NotFound404 = (props) => (
  <div className="notfound">
    <h1>Not Found 404</h1>
  </div>
)
export default class Root extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		const {match} = this.props;
		return (
		     <div >
                <div>
                  <Header />
                </div>
                <Switch> 
                    <Route exact path={`${match.path}/`} component={ Home } />
                    <Route path={`${match.path}home`} component={ Home } />
                    <Route path={`${match.path}account`} component={ Account } />
                    <Route path={`${match.path}rules`} component={ Rules } />
                    <Route path={`${match.path}how`} component={ How } />
                    {/* <Route path={`${match.path}about`} component={ About } /> */}
                    <Route path={`${match.path}test`} component={ Test } />
                    <Route component={NotFound404}/>     
                </Switch>   
            </div>
		);
	}
}
