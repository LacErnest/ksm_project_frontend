// Library
import React, { Component } from 'react';
import * as PricingAPI from '../../../../api/pricing'

// Components
import { Container, Row, Col, Button, Tabs, Tab, Image } from 'react-bootstrap'
import PricingForm from './PricingForm'


class PricingTab extends Component {
	
	state = {
		// Content
		sale: undefined,
		purchase: undefined,

		// UI
		saleIsDefined: false,
		purchaseIsDefined: false,
		saleReadOnly: true,
		purchaseReadOnly: true,
		newSale: false,
		updateSale: false,
		newPurchase: false,
		updatePurchase: false,
		user: '',
		currentPricing: 'sale',
	}


	componentDidMount() {		
		// fetching pricings from API
		PricingAPI.product(this.props.product.id)
			.then(res => {
				for (var pricing of res.data) {
					console.log('pricing elt: i', pricing)
					if (pricing.type_pricing === 'SALE') {
						this.setState({
							sale: pricing,
							saleIsDefined: true,
						})
					}
					if (pricing.type_pricing === 'PURCHASE') {
						this.setState({
							purchase: pricing,
							purchaseIsDefined: true,
						})
					}
				}
			})
			.catch(err => {
				console.log(err)
				this.setState({pricingIsDefined: false})
			})
	}

	handleDefineSale = () => {
		this.setState({
			saleIsDefined: true,
			saleReadOnly: false,
			newSale: true,
			updateSale: false,
		})
	}

	handleDefinePurchase = () => {
		this.setState({
			purchaseIsDefined: true,
			purchaseReadOnly: false,
			newPurchase: true,
			updatePurchase: false,
		})
	}

	handleModify = () => {
		console.log('modify pricing: ', this.state)
		if (this.state.currentPricing === 'sale') {
			this.setState({
				saleIsDefined: true,
				saleReadOnly: false,
				updateSale: true,
				newSale: false,
			})
		}
		if (this.state.currentPricing === 'purchase') {
			this.setState({
				purchaseIsDefined: true,
				purchaseReadOnly: false,
				updatePurchase: true,
				newPurchase: false,
			})
		}
	}

	handleResetSale = (e) => {
		if (this.state.newSale) {
			this.setState({
				saleIsDefined: false,
			})
		}

		this.setState({
			newSale: false,
			updateSale: false,
			saleReadOnly: true,
		})
	}

	handleResetPurchase = (e) => {
		if (this.state.newPurchase) {
			this.setState({
				purchaseIsDefined: false,
			})
		}

		this.setState({
			newPurchase: false,
			updatePurchase: false,
			purchaseReadOnly: true,
		})

	}

	handleSubmitSale = () => {
		this.setState({
			newSale: false,
			updateSale: false,
			saleIsDefined: true,
			saleReadOnly: true,
		})
	}
	
	handleSubmitPurchase = () => {
		this.setState({
			newPurchase: false,
			updatePurchase: false,
			purchaseIsDefined: true,
			purchaseReadOnly: true,
		})
	}
	
	handleTextChange = e => this.setState({ specification: e.target.value })

	render() {
		return (
			<>
				<Container fluid className='mg-t-30'>
					<Col>
						<Row>
							<Col sm={9}>
								
								<Tabs fill variant='tabs' defaultActiveKey='sale' onSelect={(e) => this.setState({ currentPricing: e})}>
									<Tab eventKey='sale' title='Vente'>
										<Container fluid className='mg-t-20'>
											{this.state.saleIsDefined && (
												<PricingForm product={this.props.product} sale pricing={this.state.sale} readOnly={this.state.saleReadOnly} actionReset={this.handleResetSale} actionSubmit={this.handleSubmitSale} new={this.state.newSale} update={this.state.updateSale} />
											)}
											{!this.state.saleIsDefined && (
												<>
												<Container>
													<Col className='text-center mg-t-50'>
														<h3 className='text-center'>Tarification non définie.</h3>
													</Col>
												</Container>
												<Button size='sm' className='rounded-10' onClick={this.handleDefineSale}>Definir?</Button>
												</>
											)}
										</Container>
									</Tab>
									<Tab eventKey='purchase' title='Achat'>
										<Container fluid className='mg-t-20'>
											{this.state.purchaseIsDefined && (
												<PricingForm product={this.props.product} purchase pricing={this.state.purchase} readOnly={this.state.purchaseReadOnly} actionReset={this.handleResetPurchase} actionSubmit={this.handleSubmitPurchase} new={this.state.newPurchase} update={this.state.updatePurchase}/>
											)}
											{!this.state.purchaseIsDefined && (
												<>
												<Container>
													<Col className='text-center mg-t-50'>
														<h3 className='text-center'>Tarification non définie.</h3>
														{/* <Row><Button className='rounded-10' onClick={this.handleDefine}>Definir?</Button></Row> */}
													</Col>
												</Container>
												<Button size='sm' className='rounded-10' onClick={this.handleDefinePurchase}>Définir?</Button>
												</>
											)}
										</Container>
									</Tab>

								</Tabs>
								{
									((this.state.saleIsDefined && !this.state.updateSale) && (this.state.purchaseIsDefined && !this.state.updatePurchase)) &&
									(<>
										<Col align='right'>
											<Button className='rounded-10 mg-r-10' onClick={this.handleModify}>Modifier</Button>
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
				</Container>
			</>
		)
	}
}

export default PricingTab