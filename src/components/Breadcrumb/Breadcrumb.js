// Library
import React from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types'

const Breadcrumb = ({ agency, routes, activePage }) => (
    <nav className="breadcrumb sl-breadcrumb pd-r-30">
        <span className="w-75 font-weight-bold">{ agency }</span>
        <span className="w-25 font-weight-bold d-flex justify-content-end">
            { routes.map(({position, link, name}) => (
                <Link to={`/${ link }`} key={position} className="breadcrumb-item">
                    { name }
                </Link>
            )) }
            <span className="breadcrumb-item active">{ activePage }</span>
        </span>
    </nav>
);

Breadcrumb.propTypes = {
    agency: propTypes.string.isRequired,
    activePage: propTypes.string.isRequired,
    routes: propTypes.arrayOf(
        propTypes.shape({
            position: propTypes.number.isRequired,
            link: propTypes.string.isRequired,
            name: propTypes.string.isRequired,
        })
    ).isRequired,
}

export default Breadcrumb;
