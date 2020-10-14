// Library
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

const url = window.location.pathname;

const Sidebar = () => (
    <>
        <div className="sl-sideleft">
            <label className="sidebar-label">Navigation</label>
            <div className="sl-sideleft-menu">
                <a href="/dashboard" className={`sl-menu-link ${url === '/dashboard' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon icon ion-ios-speedometer-outline tx-22"></i>
                        <span className="menu-item-label">Dashboard</span>
                    </div>
                </a>
                <a href="/compagnies" className={`sl-menu-link ${url === '/compagnies' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon icon ion-ios-location-outline tx-22"></i>
                        <span className="menu-item-label">Compagnies</span>
                    </div>
                </a>
                <a href="/human-capital" className={`sl-menu-link ${url === '/human-capital' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon icon ion-ios-folder-outline tx-22"></i>
                        <span className="menu-item-label">Human Capital</span>
                    </div>
                </a>
                <a href="/patner" className={`sl-menu-link ${url === '/patner' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon icon ion-ios-people-outline tx-22"></i>
                        <span className="menu-item-label">Patner</span>
                    </div>
                </a>
                <a href="/products" className={`sl-menu-link ${url === '/products' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon fa fa-cube tx-22"></i>
                        <span className="menu-item-label">Products</span>
                    </div>
                </a>
                <a href="/stock" className={`sl-menu-link ${url === '/stock' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon icon ion-clipboard tx-22"></i>
                        <span className="menu-item-label">Stock</span>
                    </div>
                </a>
                <a href="/transactions" className={`sl-menu-link ${url === '/transactions' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon icon ion-ios-briefcase-outline tx-22"></i>
                        <span className="menu-item-label">Transactions</span>
                    </div>
                </a>
                <a href="/accounting" className={`sl-menu-link ${url === '/accounting' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon icon ion-ios-bookmarks-outline tx-22"></i>
                        <span className="menu-item-label">Accounting</span>
                    </div>
                </a>
                <a href="/iam" className={`sl-menu-link ${url === '/iam' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon icon ion-ios-locked-outline tx-22"></i>
                        <span className="menu-item-label">IAM</span>
                    </div>
                </a>
                <a href="/setting" className={`sl-menu-link ${url === '/setting' ? 'active' : ''}`}>
                    <div className="sl-menu-item">
                        <i className="menu-item-icon icon ion-ios-gear-outline tx-22"></i>
                     
                        <span className="menu-item-label">Setting</span>
                    </div>
                </a>
            </div>
            <br/>
        </div>
    </>
);

export default Sidebar;
