// Library
import React from 'react';
import { Link } from "react-router-dom";

const Header = ( ) => (
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
        <div className="sl-header-right">
            <nav className="nav">
                <div className="dropdown">
                    <a href="#" className="nav-link nav-link-profile font-weight-bold" data-toggle="dropdown">
                        <span className="logged-name">Jane<span className="hidden-md-down"> Doe</span></span>
                        <img src={ require('./../../assets/img/user.jpg') } className="wd-32 rounded-circle" alt="" />
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
            <div className="navicon-right">
                <a id="btnRightMenu" href="#" className="pos-relative">
                    <i className="icon ion-ios-bell-outline"></i>
                    <span className="square-8 bg-light"></span>
                </a>
            </div>
        </div>
    </div>

);

export default Header;
