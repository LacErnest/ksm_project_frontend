// Library
import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
} from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';

// Component
import Notfound from 'views/Errors/Notfound';
import Dashboard from 'views/Dashboard/Dashboard';
import Products from 'views/Products/Products';
import Taxations from 'views/Products/Taxations';
import Languages from 'views/Products/Languages';

// Styles
import 'lib/font-awesome/css/font-awesome.css';
import 'lib/Ionicons/css/ionicons.css';
import 'lib/perfect-scrollbar/css/perfect-scrollbar.css';
import 'lib/rickshaw/rickshaw.min.css';
import 'lib/datatables/jquery.dataTables.css';
import 'lib/select2/css/select2.css';
import 'css/starlight.css';

// Script
import jquery from 'lib/jquery/jquery.js';
import popper from 'lib/popper.js/popper.js';
import perfectScrollbar from 'lib/perfect-scrollbar/js/perfect-scrollbar.jquery.js';
import dataTables from 'lib/datatables/jquery.dataTables.js';
import dataTablesResponsive from 'lib/datatables-responsive/dataTables.responsive.js';
import select2 from 'lib/select2/js/select2.js';
import starlight from 'js/starlight.js';

const url = window.location.pathname;

class App extends Component {
	componentDidMount() {
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact={true} component={Dashboard} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/products" component={Products} />
					<Route path="/taxations" component={Taxations} />
					<Route path="/languages" component={Languages} />
					<Route component={Notfound} />
				</Switch>
			</Router>
		);
	}
}

export default App
