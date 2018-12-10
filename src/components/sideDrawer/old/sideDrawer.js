import React from 'react';
import {
  Link
} from "react-router-dom";

import './sideDrawer.css';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
          <ul>
            <li>
              <Link to="/home">Home</Link>
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
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
    </nav>
  );
};

export default sideDrawer;