// Library
import React, { Component } from 'react';

// Component
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import Header from 'components/Header/Header';
import LogoBloc from 'components/LogoBloc/LogoBloc';
import Sidebar from 'components/Sidebar/Sidebar';
import SideRight from 'components/SideRight/SideRight';

const Notfound = () => (
    <>
        <LogoBloc />
        <Sidebar />
        <Header />
        <SideRight />

        <div className="sl-mainpanel">
            <Breadcrumb agency='FOKOU Melen' routes={BREADCRUMB_LINK} activePage="Page Not Found" />

            <div className="sl-pagebody text-center">
                <img src={ require('./../../assets/img/erreur-page-404.png') } className="wd-80p" alt="" />
            </div>
        </div>
    </>
);

const BREADCRUMB_LINK = [
    { position: 0, name: 'KSM', link: 'dashboard' },
];

export default Notfound;
