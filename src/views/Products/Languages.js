// Library
import React, { Component } from 'react';
import * as LangueAPI from '../../api/language'

// Component
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import HeaderModules from 'components/Header/HeaderModules';
import LogoBloc from 'components/LogoBloc/LogoBloc';
import Sidebar from 'components/Sidebar/Sidebar';
import SideRight from 'components/SideRight/SideRight';
import SideLeft from 'views/Products/Components/SideLeft/SideLeft';
import HomeLangue from '../../components/Langues/HomeLangue';

//
import InformationCard from '../../components/Langues/InformationCard'

import './components.css';

class Languages extends Component {
 
    constructor(props) {
		super(props);
      
         this.state = {
            langues: [],
            products:[],
            categories:[],
            showInformation: false,
            currentLangue:{},
            isLoading: true,
            id:null,
            changingLangue:false,
            produit:{},
            categorie:{}
            
        }
        
};
onClick = (langue) => {


    if(langue!==undefined){

        this.setState({
            showInformation: true,
            currentLangue: langue,
            changingLangue: true,
        });
        this.forceUpdate();
        this.listProductLangue(langue);
        this.listCategoryLangue(langue);
        console.log("state langue: " + langue.name);
    }
}
    componentDidMount() {
        document.body.classList.add('collapsed-menu');
        //fetching the list of all taxes
        LangueAPI.list()
        .then(res => 
            {this.setState({langues: res.data.results, isLoading: false})
        })
        .catch(err => console.log(err))
    }                    
    handleInformation = () => {
		this.setState({showInformation: !this.state.showInformation});
    };
    
    listProductLangue=(langue)=>
    {
            // fetching produscts describes in a specific language of the API 
     LangueAPI.listProductLangue(langue.id) 
     .then(res=>{
            this.setState({products:res.data})
            console.log(res.data)
            }).catch(err => console.log(err))
    }
    listCategoryLangue=(langue)=>
    {
            // fetching produscts describes in a specific language of the API 
         LangueAPI.listCategoryLangue(langue.id).then(res=>{
            this.setState({categories:res.data})
            console.log(res.data)
            }).catch(err => console.log(err))
    }
    render() {
        const BREADCRUMB_LINK = [
            { position: 0, name: 'KSM', link: 'dashboard' },
            { position: 1, name: 'Products', link: 'languages' },
        ];

        return (
            <>
               <LogoBloc />
				<Sidebar />
				<HeaderModules modules='Langues' />
				

				<div className="sl-mainpanel">
					<SideRight />

					<div className="mailbox-content">
						<Breadcrumb agency='FOKOU Melen' routes={BREADCRUMB_LINK} activePage="Langues" />

						<div className="pd-25">
                            <SideLeft />

                            <div  className="card pd-20 pd-sm-40">
                                <div id="table" className="resizable-content-standard"  >
								    <HomeLangue onClick={this.onClick} />
                                </div>
							</div>


                             {this.state.showInformation &&
                              <InformationCard 
                              langue={this.state.currentLangue} 
                            />} 
						</div>
                        
                        
                    </div>
                </div>
				
			</>
		);
	}
}
export default Languages;





