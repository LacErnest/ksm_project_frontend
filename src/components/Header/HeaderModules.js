// Library
import React from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types'

const HeaderModules = ({ modules }) => (
    <div className="sl-header bg-theme-light">
        <div className="sl-header-left">
            <div className="navicon-left hidden-md-down">
                <a id="btnLeftMenu" href="#">
                    <i className="icon ion-navicon-round"></i>
                </a>
            </div>
            <div className="navicon-left hidden-lg-up">
                <a id="btnLeftMenuMobile" href="#">
                    <i className="icon ion-navicon-round"></i>
                </a>
            </div>
        </div>
        <div className="sl-header-right w-100">
            <div className="justify-content-start pl-3">
                <h2 className="tx-white">{ modules }</h2>
            </div>
            <nav className="nav pos-fixed" style={{ right: `60px` }}>
                <div className="dropdown">
                    <a href="#" className="nav-link nav-link-profile font-weight-bold" data-toggle="dropdown">
                        <span className="logged-name">Jane<span className="hidden-md-down"> Doe</span></span>
                        <img src={ require('img/user.jpg') } className="wd-32 rounded-circle" alt="" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-header wd-200">
                        <ul className="list-unstyled user-profile-nav">
                            <li>
                                <Link to="/dashboard">
                                    <i className="icon ion-ios-person-outline"></i> Edit Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard">
                                    <i className="icon ion-ios-gear-outline"></i> Settings
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard">
                                    <i className="icon ion-power"></i> Sign Out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="navicon-right pos-fixed r-0">
                <a id="btnRightMenu" href="#" className="pos-relative">
                    <i className="icon ion-ios-bell-outline"></i>
                    <span className="square-8 bg-light"></span>
                </a>
            </div>
        </div>
    </div>

);

export default HeaderModules;
