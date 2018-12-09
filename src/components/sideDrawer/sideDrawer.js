import React from 'react';
import {
  Link
} from "react-router-dom";
import { connect } from 'react-redux'
import { MDText } from 'i18n-react';
import {changeLang} from '@/store/actions/index'

let T;

const mapStateToProps = (state) => ({
	lang: state.lang
})
const mapDispatchToProps = (dispatch) => ({
  changeLang:  lang => dispatch(changeLang(lang))
})

import './sideDrawer.css';

class sideDrawer  extends React.Component{
  constructor(props) {
		super(props)
    T = new MDText(this.props.lang.data);
	}

  clickChangeLang (lang) {
    if (this.props.lang.lang == lang) {
      return ;
    }
    this.props.changeLang(lang);
  }
  componentWillReceiveProps (nextProps) {
    T.setTexts(nextProps.lang.data);
  }
  render() {
    return (
      <nav className={['side-drawer', this.props.show?'open':null].join(' ')}>
            <ul>
              <li>
                <span onClick={() => this.clickChangeLang('en')} className={this.props.lang.lang == 'en' ? 'disable' : null}>EN</span>
                <span onClick={() => this.clickChangeLang( 'cn')} className={this.props.lang.lang == 'cn' ? 'disable' : null}>简</span>
              </li>
              <li>
                <Link to="/home">{T.translate("Home")}</Link>
              </li>
              <li>
                <Link to="/account">My Account</Link>
              </li>
               <li>
                <Link to="/how">How to Play</Link>
              </li>
              <li>
                <Link to="/rules">Rules</Link>
              </li>
            </ul>
      </nav>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);