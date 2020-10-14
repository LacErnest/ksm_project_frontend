// Libraries
import React, { Component,Fragment } from 'react';
import {MDBBtn,MDBTooltip} from "mdbreact";
import * as TaxationAPI from '../../api/taxation'
import * as ProductAPI from '../../api/product'
import '../../index.css';

//React-Bootstrap
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Autocomplete from './AutoComplete'
import FormData from 'form-data'
import Card from 'react-bootstrap/Card'



// Components
import { Container,   Button, Modal ,Row , Col} from 'react-bootstrap'


	class ProductsTab extends Component {
        constructor(props) {
            super(props)
            // Bind `this` context to functions of the class
            this.handleProduitChange = this.handleProduitChange.bind(this);
        }
		
		state = {
            products:this.props.products,
            taxe:this.props.taxe,
            taxations:[],
            success:false,
            success_ajout:false,
            failure:false,
            showModal:false,
            produit:{},
            //gestion produit taxe avec l'autocompletion
            existe :false,
            definition_taxe:false,
            product_taxe:{},
            
            
			
		}

	 componentDidMount() {
           
            this.get_taxations();
           
        }
        get_taxations()
        {
            TaxationAPI.list().then(res=>{
             this.setState({taxations:res.data.results})
            })
        }
        handleProduitChange (produit){
            this.state.product_taxe=produit;
            console.log("pro"+this.state.product_taxe.name)
            this.setState({definition_taxe:true})
          ProductAPI.listTaxes(produit.id).then(res=>{
            if(res.status==200) { 
                       console.log("list_taxe"+res.data)
                        var list_taxes_product = res.data
                        var taxe_courante = list_taxes_product.find(elt=> elt.name==this.props.taxe.name)
                      
                        
                        if(taxe_courante)
                        {
                            this.setState({existe:true})
                        }
                        else
                        {
                            this.setState({existe:false}) 
                        }
    
            }
            else
            {
                this.setState({existe:false}) 
            }
            console.log("les taxes que la premier page de la liste des taxes renvoie")
            this.state.taxations.map((elt)=>(
            console.log(elt.tax+"    "+elt.product)
   )
       )
        }).catch(err => console.log(err))
    }
                
        
            
  
    handleClick  = () => {

if(this.state.existe)
{   
    var taxation = null;
    console.log("la taxe et le produit actuel")
    console.log(this.props.taxe.name+"    "+this.state.product_taxe.name)
            TaxationAPI.taxationProdTaxe(this.state.product_taxe.id,this.props.taxe.id)
            .then(res=>{
                taxation = res.data.results[0];
                console.log(taxation);
				TaxationAPI.destroy(taxation.id)
					.then(res => {
                        this.props.resetProducts(this.props.taxe)
                        this.setState({success: true})
                        this.setState({existe:false})
					})
                    .catch(err => this.setState({failure: true,showModal:false}))
                    
        }).catch(err => console.log(err))
    
}
else
{
    var data = new FormData()
				data.append('tax', this.props.taxe.name)
				data.append('product', this.state.product_taxe.name)

				TaxationAPI.create(data)
					.then(res => {
						this.props.resetProducts(this.props.taxe)
                        this.setState({success_ajout: true })
                        this.setState({existe:true})
					})
                    .catch(err => this.setState({failure: true,showModal:false}))
            
}

        




    } 
        handleCancel = (event) => {
            this.setState({
                showModal: false,
                success: false,
                success_ajout:false,
                failure: false
            })
        }
        handleConfirm = (id_product) => {
            console.log("id"+id_product)
          var  product= this.props.products.find(elt =>id_product === elt.id)
          console.log("prod"+product.name)
            this.setState({showModal: true});
            this.state.produit=product
            console.log("hjkk"+this.state.produit.name)

        }
	
		handleDeleteTaxation = () => {
            var taxation = null;
            console.log("la taxe et le produit actuel")
            console.log(this.props.taxe.name+"    "+this.state.produit.name)
            TaxationAPI.taxationProdTaxe(this.state.produit.id,this.props.taxe.id)
            .then(res=>{
                        console.log("hummooo")
                        console.log(res)
                        console.log(res.data.results[0])
                        taxation = res.data.results[0];
                        console.log(taxation);
                        TaxationAPI.destroy(taxation.id)
                            .then(res => {
                                this.setState({success: true,showModal:false})
                                this.props.resetProducts(this.props.taxe)
                                if(this.state.product_taxe){
                                    if(this.state.produit.name===this.state.product_taxe.name)
                                    {
                                         this.setState({existe:false})
                                    }
                                }

                               
                            })
                            .catch(err => this.setState({failure: true,showModal:false}))
                }).catch(err => console.log(err))
            


           	
		}

        
		render() {
        const {SearchBar} = Search;
        
        //Columns of the array 
        const columns = [ 
          {
          dataField: 'name',
          text: 'Nom',
          sort: true,
        
          headerSortingStyle: {
            backgroundColor: '#a2e6c3'
          }
        }, 
        {
          dataField: 'category',
          text: 'Category',
          sort: true,
        /*   headerStyle: {
            backgroundColor: '#FF8333'
          }, */
          headerSortingStyle: {
            backgroundColor: '#a2e6c3'
          }
        },
        
        {
            //Mettre un boutton,
            text: 'Actions',
            dataField: 'Actions',
            isDummyField: true,
            formatter: (cellContent, row) => {
              return ( 
                <Fragment > 
                    <MDBTooltip placement="bottom">
                        <MDBBtn
                            id='suppression'
                            color='danger'
                          className="btn-primary"
                          onClick={() => this.handleConfirm(row.id)}
                          
                        >
                         <i className="menu-item-icon    icon ion-trash-b tx-14  "></i>
                        </MDBBtn>
                        <div>supprimer</div>
                    </MDBTooltip>
                      
                </Fragment>        
              );
            },
         /*    headerStyle:{
              backgroundColor: '#FF8333'
            } */
        },
        ]; 

			return (
				<>
					<Container fluid className='mg-t-30'>
                    <div  width='18rem' borderWidth="thick" >
                    <Card  >
                    <Card.Header>AJOUT/RETRAIT RAPIDE D'UNE TAXE SUR UN PRODUIT</Card.Header>
                    <Card.Body>
                       
<Row>    
    <Col>   
       <Autocomplete
											getItemValue={this.getItemValue}
											items={this.state.autocompleteData}
											renderItem={this.renderItem}
											value={this.state.value}
											onChange={this.onChange}
											onSelect={this.onSelect}
											menuStyle={this.style}
											inputProps={{ style: { width: '400px',height: '50px',borderRadius: '3px',  background:'#DCDCDC'}, placeholder: 'Entrez le code du produit'}}
											handleProduitChange={this.handleProduitChange}
		/>  
         </Col>  
         <Col>
         
                                   { 
                                    this.state.definition_taxe &&  <div class="card">
                                    
                                    <MDBBtn color={this.state.existe ? 'danger' :'primary' } 
                                       id={this.state.existe ?'suppression':'ajout'}
                                       onClick={this.handleClick}>
                                  {this.state.existe ?<i className="menu-item-icon    icon ion-minus-circled tx-14  "></i>: <i className="menu-item-icon icon ion-plus-circled tx-14"></i>}
                                     
                                    </MDBBtn>
                                                              
                                  
                                    </div>
                                    }
         </Col>

                                           </Row>
                                        <br/>
                                    <br/>
                                    <br/>
                                   

                                           </Card.Body>
                                           
                                           </Card>      
										   </div>
                                           </Container>
									
                                           <br/>              
                 <Card  >
                    <Card.Header>TABLAUX DES PRODUITS SOUMIS A LA TAXE</Card.Header>
                    <Card.Body>
                            <ToolkitProvider
                                            keyField="id"
                                            data={this.props.products}
                                            columns={ columns}
                                            search
                                        >
                                        {
                                        props => (
                                        <div>
                                        <SearchBar 
                                        { ...props.searchProps } placeholder="Recherche" />
                                        <hr />
                                        <BootstrapTable
                                        bootstrap4
                                        { ...props.baseProps }
                                        pagination={ paginationFactory()}
                                        noDataIndication="Aucun produit à afficher pour le moment !!"
                                        striped 
                                        size="sm"
                                        />
                                        </div>
                                            )
                                        }
                </ToolkitProvider>
                </Card.Body>
                </Card>
                        <Modal size="sm" show={this.state.showModal} onHide={this.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Voulez-vous vraiment supprimer cette Taxe pour ce Produit?
            </Modal.Body>
            <Modal.Footer>
                <Button className='rounded-10' variant='primary' onClick={this.handleDeleteTaxation} >OUI</Button>
                <Button className='rounded-10' variant='secondary' onClick={this.handleCancel}>ANNULER</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={this.state.success} onHide={this.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Taxe supprimee!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button className='rounded-10' variant='success' onClick={this.handleCancel} >Ok</Button>
            </Modal.Footer>
        </Modal>
        <Modal show={this.state.success_ajout} onHide={this.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Taxe ajoutée!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button className='rounded-10' variant='success' onClick={this.handleCancel} >Ok</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={this.state.failure} onHide={this.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Error!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button className='rounded-10' variant='danger' onClick={this.handleCancel} >Ok</Button>
            </Modal.Footer>
        </Modal>
					
				</>
			)
		}
	}

	export default  ProductsTab;