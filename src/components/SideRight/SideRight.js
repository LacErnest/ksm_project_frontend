// Library
import React from 'react';
import { Link } from "react-router-dom";

const SideRight = ({ }) => (
    <div className="sl-sideright">
        <ul className="nav nav-tabs nav-fill sidebar-tabs" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" role="tab" href="#messages">Messages (0)</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" role="tab" href="#notifications">Notifications (0)</a>
            </li>
        </ul>

        <div className="tab-content">
            <div className="tab-pane pos-absolute a-0 mg-t-60 active" id="messages" role="tabpanel">

            </div>

            <div className="tab-pane pos-absolute a-0 mg-t-60 overflow-y-auto" id="notifications" role="tabpanel">

            </div>
        </div>
    </div>
);

export default SideRight;
