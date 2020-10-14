// Library
import React, { Component } from 'react';
import * as TaxeAPI from '../../api/tax'

// Component
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import HeaderModules from 'components/Header/HeaderModules';
import LogoBloc from 'components/LogoBloc/LogoBloc';
import Sidebar from 'components/Sidebar/Sidebar';
import SideRight from 'components/SideRight/SideRight';
import SideLeft from 'views/Products/Components/SideLeft/SideLeft';
import HomeTaxe from '../../components/Taxations/HomeTaxe';

//
import InformationCard from '../../components/Taxations/InformationCard'

import './components.css';

class Taxations extends Component {
 
    constructor(props) {
		super(props);
      
         this.state = {
            taxes:[],
            showInformation: false,
            currentTaxe:null,
            products:[],
            produit:{},
        
            isLoading: true,
            changingTaxe:false,
            id:null,
            
        }

};
onClick = (taxe) => {


    if(taxe!==undefined){

        this.setState({
            showInformation: true,
            currentTaxe: taxe,
            changingTaxe: true,
        });
        this.forceUpdate();
        this.listProductTaxe(taxe);
        console.log("state taxe: " + taxe.name);
    }
}
    componentDidMount() {
        document.body.classList.add('collapsed-menu');
        //fetching the list of all taxes
        TaxeAPI.list()
        .then(res => this.setState({taxes: res.data.results, isLoading: false}))
        .catch(err => console.log(err))
    }                    
    handleInformation = () => {
		this.setState({showInformation: !this.state.showInformation});
    };
    
    listProductTaxe=(taxe)=>
    {
            // fetching produscts with the currentTaxe of the API 
            console.log("eeeeeeeeeeeeeee")
            console.log(taxe)
            TaxeAPI.listProducts_Taxe(taxe).then(res=>{
            this.setState({products:res.data})
            console.log(res.data)
            }).catch(err => console.log(err))
    }

    render() {
        const BREADCRUMB_LINK = [
            { position: 0, name: 'KSM', link: 'dashboard' },
            { position: 1, name: 'Products', link: 'taxes' },
        ];

        return (
            <>
               <LogoBloc />
				<Sidebar />
				<HeaderModules modules='Taxations' />
				

				<div className="sl-mainpanel">
					<SideRight />

					<div className="mailbox-content">
						<Breadcrumb agency='FOKOU Melen' routes={BREADCRUMB_LINK} activePage="Taxes" />

						<div className="pd-25">
                            <SideLeft />

                            <div  className="card pd-20 pd-sm-40">
                                <div id="table" className="resizable-content-standard"  >
								    <HomeTaxe onClick={this.onClick} />
                                </div>
							</div>


                             {this.state.showInformation &&
                              <InformationCard 
                              taxe={this.state.currentTaxe} 
                            products={this.state.products} 
                            resetProducts={this.listProductTaxe}/>} 
						</div>
                        
                        
                    </div>
                </div>
				
			</>
		);
	}
}
export default Taxations;





