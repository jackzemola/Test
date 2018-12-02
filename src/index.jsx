import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Root from './pages/root';

export default class GameApp extends React.Component {
  constructor(props) {
    super(props)
  
  }
  render() {
    return (
        <Router >
            <Route path={"/"} component={Root} />                
        </Router>
    );
  }
}
ReactDOM.render(<GameApp />,document.getElementById('app'));
module.hot.accept();
