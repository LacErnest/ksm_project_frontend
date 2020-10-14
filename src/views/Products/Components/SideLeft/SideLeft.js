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

const SideLeft = () => (
    <>
        <div className="mailbox-sideleft">
            <img src={ require('img/modules/products.jpeg') } alt="" className="d-block w-100 ht-150" />
            <br/>
            <a href="#" className="btn btn-primary btn-block font-weight-bold">
                <i className="icon ion-android-add-circle"></i> Ajouter
            </a>

            <label className="pd-t-10-force pd-l-10 tx-11 tx-uppercase">Navigation</label>
            <nav className="nav nav-mailbox flex-column">
                <a href="/products" className="nav-link">
                    <i className="icon ion-link tx-20"></i> Produits
                </a>
                <a href="/taxations" className="nav-link">
                    <i className="icon ion-link tx-20"></i> Taxes
                </a>
                <a href="/languages" className="nav-link">
                    <i className="icon ion-link tx-20"></i> Langues
                </a>
            </nav>
        </div>
    </>
);

export default SideLeft;
