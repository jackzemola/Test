import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Root from './pages/root';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/index';

const store = createStore(rootReducer)

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
ReactDOM.render(
  <Provider store={store}>
    <GameApp />
  </Provider>,
  document.getElementById('app'));
module.hot.accept();
