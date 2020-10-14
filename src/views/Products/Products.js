// Library
import React, { Component} from 'react';
import * as ProductAPI from '../../api/product'

// Component
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import HeaderModules from 'components/Header/HeaderModules';
import LogoBloc from 'components/LogoBloc/LogoBloc';
import Sidebar from 'components/Sidebar/Sidebar';
import SideRight from 'components/SideRight/SideRight';
import SideLeft from 'views/Products/Components/SideLeft/SideLeft';
import InformationCard from 'views/Products/Components/Information/InformationCard'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import HomeProduit from "../../components/HomeProduit/HomeProduit";

//styles
import './components.css';


class Products extends Component {


    constructor(props) {
        super(props)
        this.state = {
		    // Content
            products: [],
            showInformation: false,
            currentProduct: {},
            taxations: [],

            // UI
            isLoading: true,
            changingProduct: false,
	    }
        this.onClick=this.onClick
    };

    onClick = (product) => {


                if(product!==undefined){

                    this.setState({
                        showInformation: true,
                        currentProduct: product,
                        changingProduct: true,
                    });
                    this.forceUpdate();
                    console.log("state product: " + product.name);
				}

    };


	componentDidMount() {
		document.body.classList.add('collapsed-menu');
		// fetching the list of all products
		ProductAPI.list()
			.then(res => this.setState({products: res.data.results, isLoading: false}))
			.catch(err => console.log(err))
	}

	handleInformation = () => {
		this.setState({showInformation: !this.state.showInformation});
	}

	render() {
		const BREADCRUMB_LINK = [
			{ position: 0, name: 'KSM', link: 'dashboard' },
			{ position: 1, name: 'Products', link: 'products' },
		];
		return (
			

			<>
				<LogoBloc />
				<Sidebar />
				<HeaderModules modules='Products' />
				

				<div className="sl-mainpanel">
					<SideRight />

					<div className="mailbox-content">
						<Breadcrumb agency='FOKOU Melen' routes={BREADCRUMB_LINK} activePage="Products" />

						<div className="pd-25">
						<SideLeft />
							<div  className="card pd-20 pd-sm-40">
                                <div id="table" className="resizable-content-standard"  >
								    <HomeProduit onClick={this.onClick} />
                                </div>
							</div>

							{this.state.showInformation && <InformationCard
								product={this.state.currentProduct}
								reload={this.state.changingProduct}
							/>}
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Products;
