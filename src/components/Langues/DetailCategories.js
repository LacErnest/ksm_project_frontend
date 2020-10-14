// Library
import React, { Component } from 'react';
import * as DescriptionAPI from '../../api/descriptionCategorie'
import FormData from 'form-data'
import '../../index.css';


// Components
import { Button, Modal, ModalHeader, ModalBody,ModalFooter } from "reactstrap";
import {MDBBtn,MDBTooltip} from "mdbreact";
import { Container, Row, Col, Form, Image} from 'react-bootstrap'
import Autocomplete from './AutoCompleteC'

class DescriptionTab extends Component {
	constructor(props) {
        super(props)
        // Bind `this` context to functions of the class
        this.handleCategorieChange = this.handleCategorieChange.bind(this);
    }

	state = {
		// Content
		language: this.props.langue.name,
		currentDescription: {},
		specification: '',
        description: '',
        category:null,

		// UI
		showModal: false,
		success: false,
		failure: false,

		descriptionIsDefined: false,
		readOnly: true,
		newDescription: false,
		updateDescription: false
	}
	handleConfirm = (event) => {
		this.setState({showModal: true})
    }
    
    handleCancel = (event) => {
        this.setState({
            showModal: false,
            success: false,
            failure: false
        })
            }
	
    handleCategorieChange (categorie){
		this.setState({category:categorie,
			descriptionIsDefined: false,
			specification:"",
			description: "",
		})
        DescriptionAPI.DescCategLang(categorie.id,this.props.langue.code).then(res=>{
        if(res.status==200) { 
			console.log("er"+res)
					var desc =res.data[0]
					console.log("ereryy"+res.data[0])
					this.setState({
						// Content
						currentDescription: desc,
						specification: desc.specification,
						description: desc.description,

						// UI
						descriptionIsDefined: true,
						readOnly: true,
						newDescription: false,
						updateDescription: false,
					})
					
				
			
			} else
			{
				this.setState({descriptionIsDefined: false})
			}
        }).catch(err => console.log(err))
				
			
	
		
		}
	
	handleDefine = () => {
		this.setState({
			descriptionIsDefined: true,
			readOnly: false,
			newDescription: true,
			updateDescription: false,
		})
	}

	handleModify = () => {
		this.setState({
			descriptionIsDefined: true,
			readOnly: false,
			updateDescription: true,
			newDescription: false,
		})
	}
	
	handleSubmit = (e) => {
		var data = new FormData()
		data.append('language', this.state.language)
		data.append('description', this.state.description)
		data.append('specification', this.state.specification)
		data.append('category', this.state.category.name)

		if (this.state.newDescription) {
			DescriptionAPI.create(data)
				.then(res => {
					console.log("james1")
					console.log(res.data)
					this.setState({
						newDescription: false,
						currentDescription: res.data,
						success:true,
					})
				})
				.catch(err => this.setState({failure:true,
					descriptionIsDefined:false}))
		}

		if (this.state.updateDescription) {
			
			DescriptionAPI.update(this.state.currentDescription.id, data)
				.then(res => {
					console.log("tall2")
					console.log(res.data)
					this.setState({
						updateDescription: false,
						currentDescription: res.data,
						success:true,
					})
				})
				.catch(err => this.setState({failure:true,
					description:this.state.currentDescription.description,
					specification:this.state.currentDescription.specification
				}))
		}

		this.setState({
			newDescription: false,
			updateDescription: false,
			descriptionIsDefined: true,
			readOnly: true,
		})

		e.preventDefault()
	}


	handleReset = (e) => {
		console.log('state desc', this.state)
		if (this.state.newDescription) {
			this.setState({
				descriptionIsDefined: false,
				specification: this.state.currentDescription.specification,
				description: this.state.currentDescription.description,
			})
		}

		this.setState({
			newDescription: false,
			updateDescription: false,
			readOnly: true,
			specification: this.state.currentDescription.specification,
			description: this.state.currentDescription.description,
		})

		e.preventDefault()
	}

	deleteDescription = () => {
	
		DescriptionAPI.destroy(this.state.currentDescription.id)
		.then(()=>
		{
			console.log("tall3")
						this.setState({
							updateDescription: false,
							newDescription: false,
							descriptionIsDefined: false,
							currentDescription: {},
							showModal:false,
							success:true,
						})
		}
		).catch(()=>
		{
			this.setState({
				updateDescription: false,
				newDescription: false,
				showModal:false,
				failure:true,
			})
	
		});
				
			}
		
			
		
	

	render() {

		return (
			<>
				<Container fluid className='mg-t-30'>
					
					<Col>
						<Row md={2}>
							<Col sm={9}>
							
								<Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
									<Form.Group as={Row} controlId='productsField'>
										<Form.Label column sm={3} ><b>Categories</b></Form.Label>
										
									<Col sm={4}>
									<div>
										<Autocomplete
											getItemValue={this.getItemValue}
											items={this.state.autocompleteData}
											renderItem={this.renderItem}
											value={this.state.value}
											onChange={this.onChange}
											onSelect={this.onSelect}
											menuStyle={this.style}
											inputProps={{ style: { width: '400px',height: '50px',borderRadius: '3px',  background:'#DCDCDC'}, placeholder: 'Entrez le code de la catégorie'}}
											handleCategorieChange={this.handleCategorieChange}
										/>
									</div>
									</Col>
									</Form.Group>

<br/>
<br/>
<br/>
<br/>
<br/>

									{
										this.state.descriptionIsDefined &&
									<>
										<Form.Group as={Row} controlId='specField'>
											<Form.Label column sm={2} >Specification</Form.Label>
											<Col sm={8}>
												<Form.Control  readOnly={this.state.readOnly} required value={this.state.specification} onChange={e => this.setState({ specification: e.target.value })} /> 
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId='descField'>
											<Form.Label column sm={2}>Description</Form.Label>
												<Col sm={8}>
												<Form.Control readOnly={this.state.readOnly} as='textarea' rows={3} required value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
											    </Col>
										</Form.Group>
											
											{
												(this.state.updateDescription || this.state.newDescription) &&
												<Row>
													<Col align='right'>
													<MDBTooltip placement="bottom">
														<MDBBtn color="deep-orange"
														id='save'
														 type='submit'>
															<i className="menu-item-icon icon ion-archive tx-22"></i>
          											    </MDBBtn>
            											<div>Sauvegarder</div>
     												</MDBTooltip>
													 <MDBTooltip placement="bottom">
            											<MDBBtn id ='annuler'  color="deep-orange" type='reset'>
														<i className="menu-item-icon icon ion-reply tx-22"></i>
          											    </MDBBtn>
            											<div>Annuler</div>
     												</MDBTooltip>
													 
													</Col>
												</Row>
											}
											{
											(this.state.descriptionIsDefined && !this.state.updateDescription && !this.state.newDescription) &&
												(<>
												<Col align='right'>
												   <MDBTooltip placement="bottom">
            											<MDBBtn color="deep-orange" id="edition" onClick={this.handleModify}>
														<i className="menu-item-icon  icon ion-edit"></i>
          											    </MDBBtn>
            											<div>Modifier</div>
     												</MDBTooltip>
													<MDBTooltip placement="bottom">
            											<MDBBtn color="deep-orange" id="suppression" onClick={this.handleConfirm}>
														<i className="menu-item-icon  icon ion-trash-b"></i>
          											    </MDBBtn>
            											<div>Supprimer</div>
     												</MDBTooltip>
													</Col>
												</>)
											}
									</>
									}

									{
										(!this.state.descriptionIsDefined && !this.state.newDescription) &&
										<Container>
											<Col className='text-center mg-t-50'>
											{(this.state.category)?(<h3 className='text-center'>Description non definie pour cette langue.</h3>)
											:(<h3 className='text-center'>Selectionnez une catégorie.</h3>)}
											</Col>
										</Container>
									}

								</Form>
								{
							(!this.state.descriptionIsDefined && !this.state.newDescription && !this.state.updateDescription&& this.state.category) &&
								(<>
									<Col className='mg-t-100' align='right'>
													<MDBTooltip placement="bottom">
            											<MDBBtn color="deep-orange" id='ajout' onClick={this.handleDefine}>
														<i className="menu-item-icon icon ion-plus-circled tx-22"></i>
          											    </MDBBtn>
            											<div>Definir?</div>
     												</MDBTooltip>
									    </Col>
								</>)
							}
							</Col>
							<Col align='right' sm={3}>
								<Image width='180px' height='180px' src='https://www.readlightnovel.org/uploads/posters/1546424063.jpg' />
							</Col>
						</Row>
						
						<Row>
						</Row>
					</Col>
					<Modal size ="sm" isOpen={this.state.showModal} toggle={this.handleCancel}>
            <ModalHeader toggle={this.handleCancel}>
                Confirmation
            </ModalHeader>
            <ModalBody>
                Voulez-vous vraiment supprimmer cette Description?
            </ModalBody>
            <ModalFooter>
                <Button color='danger' className="btn-primary" onClick={this.deleteDescription} >OUI</Button>
                <Button className='rounded-10'  variant="secondary" onClick={this.handleCancel}>ANNULER</Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.success} toggle={this.handleCancel}>
            <ModalHeader toggle={this.handleCancel}>
                Success!
            </ModalHeader>
            <ModalFooter>
                <Button className='rounded-10' variant='success' onClick={this.handleCancel} >Ok</Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.failure} toggle={this.handleCancel}>
            <ModalHeader toggle={this.handleCancel}>
                Error!
            </ModalHeader>
            <ModalFooter>
                <Button className='rounded-10' variant='danger' onClick={this.handleCancel} >Ok</Button>
            </ModalFooter>
        </Modal>
				</Container>
			</>
		)
	}
}

export default DescriptionTab