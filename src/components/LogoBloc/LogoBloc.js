// Library
import React from 'react';
import { Link } from "react-router-dom";

const LogoBloc = ({ }) => (
    <div className="sl-logo">
        <Link to="/dashboard">
            <i className="fa fa-cube tx-theme-light"></i> KSM
        </Link>
    </div>
);

export default LogoBloc;
