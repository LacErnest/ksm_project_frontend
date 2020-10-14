// Library
import React, { Component } from 'react';
import { Link } from "react-router-dom";

// Component
import Sidebar from 'components/Sidebar/Sidebar';
import LogoBloc from 'components/LogoBloc/LogoBloc';
import Header from 'components/Header/Header';
import SideRight from 'components/SideRight/SideRight';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';

class Dashboard extends Component {
    render() {
        const BREADCRUMB_LINK = [
            { position: 0, name: 'KSM', link: 'dashboard' },
        ];

        return (
            <>
                <LogoBloc />
                <Sidebar />
                <Header modules="Dashboard" />
                <SideRight />

                <div className="sl-mainpanel">
                    <Breadcrumb agency='FOKOU Melen' routes={BREADCRUMB_LINK} activePage="Dashboard" />

                    <div className="sl-pagebody">
                        <div className="row row-sm">
                            <div className="col-sm-6 col-xl-3">
                                <div className="card pd-20 bg-primary">
                                    <div className="d-flex justify-content-between align-items-center mg-b-10">
                                        <h6 className="tx-11 tx-uppercase mg-b-0 tx-spacing-1 tx-white">
                                            Today's Sales
                                        </h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h3 className="mg-b-0 tx-white tx-lato tx-bold">850 XAF</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3 mg-t-20 mg-sm-t-0">
                                <div className="card pd-20 bg-info">
                                    <div className="d-flex justify-content-between align-items-center mg-b-10">
                                        <h6 className="tx-11 tx-uppercase mg-b-0 tx-spacing-1 tx-white">
                                            This Week's Sales
                                        </h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h3 className="mg-b-0 tx-white tx-lato tx-bold">4 625 XAF</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
                                <div className="card pd-20 bg-purple">
                                    <div className="d-flex justify-content-between align-items-center mg-b-10">
                                        <h6 className="tx-11 tx-uppercase mg-b-0 tx-spacing-1 tx-white">
                                            This Month's Sales
                                        </h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h3 className="mg-b-0 tx-white tx-lato tx-bold">11 908 XAF</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
                                <div className="card pd-20 bg-sl-primary">
                                    <div className="d-flex justify-content-between align-items-center mg-b-10">
                                        <h6 className="tx-11 tx-uppercase mg-b-0 tx-spacing-1 tx-white">
                                            This Year's Sales
                                        </h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h3 className="mg-b-0 tx-white tx-lato tx-bold">91 239 XAF</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;
