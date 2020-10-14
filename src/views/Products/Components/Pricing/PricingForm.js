// Libraries
import React, { Component } from 'react';
import * as PricingAPI from '../../../../api/pricing'
import FormData from 'form-data'

// Components
import {Row, Col, Button, Form} from 'react-bootstrap'

class PricingForm extends Component {

	state = {
		// content
		pricing: undefined,
		average_price: 0,
		cost_price: 0,
		unit_pricing: 0,
		percentage_expence: 0,
		percentage_margin_rate: 0,
		percentage_brand_taxes: 0,
		half_wholesale_price: 0,
		wholesale_price: 0,
		percentage_half_big_price: 0,
		percentage_wholesale_price: 0,
		total_accumulated_price: 0,
		type_pricing: '',
	}

	componentDidMount() {
		// Setting the type of pricing
		if (this.props.sale) {
			this.setState({type_pricing: 'SALE'})
		}
		if (this.props.purchase) {
			this.setState({type_pricing: 'PURCHASE'})
		}

		// Filling the form if a pricing is given
		console.log('current pricing', this.props)
		console.log('current pricing', this.state)
		if (this.props.pricing !== undefined) {
			console.log('here...')
			this.setState({
				average_price: this.props.pricing.average_price,
				cost_price: this.props.pricing.cost_price,
				unit_pricing: this.props.pricing.unit_pricing,
				percentage_expence: this.props.pricing.percentage_expence,
				percentage_margin_rate: this.props.pricing.percentage_margin_rate,
				percentage_brand_taxes: this.props.pricing.percentage_brand_taxes,
				half_wholesale_price: this.props.pricing.half_wholesale_price,
				wholesale_price: this.props.pricing.wholesale_price,
				percentage_half_big_price: this.props.pricing.percentage_half_big_price,
				percentage_wholesale_price: this.props.pricing.percentage_wholesale_price,
				total_accumulated_price: this.props.pricing.total_accumulated_price,
			})
		}
	}

	handleSubmit = (e) => {

		console.log('props pricing: ', this.props)
		console.log('state pricing: ', this.state)

		var elt = new FormData()
        elt.append('average_price', this.state.average_price)
        elt.append('cost_price', this.state.cost_price)
        elt.append('unit_pricing', this.state.unit_pricing)
        elt.append('percentage_expence', this.state.percentage_expence)
        elt.append('percentage_margin_rate', this.state.percentage_margin_rate)
        elt.append('percentage_brand_taxes', this.state.percentage_brand_taxes)
        elt.append('half_wholesale_price', this.state.half_wholesale_price)
        elt.append('wholesale_price', this.state.wholesale_price)
        elt.append('percentage_half_big_price', this.state.percentage_half_big_price)
        elt.append('percentage_wholesale_price', this.state.percentage_wholesale_price)
        elt.append('total_accumulated_price', this.state.total_accumulated_price)
        elt.append('type_pricing', this.state.type_pricing)
		elt.append('product', this.props.product.name)
		
		if (this.props.new) {
			PricingAPI.create(elt)
				.then(res => {
					console.log(res.data)
					this.setState({ pricing: res.data })
				})
				.catch(err => console.log(err))
		}

		if (this.props.update) {
			let pricing = this.props.pricing ? this.props.pricing : this.state.pricing
			PricingAPI.update(pricing.id, elt)
				.then(res => {
					this.setState({pricing: res.data})
				})
				.catch(err => console.log(err))
		}

		this.props.actionSubmit()

		e.preventDefault();
	}

	handleReset = (e) => {
		this.props.actionReset(e)
		this.setState({
			average_price: this.props.pricing.average_price,
			cost_price: this.props.pricing.cost_price,
			unit_pricing: this.props.pricing.unit_pricing,
			percentage_expence: this.props.pricing.percentage_expence,
			percentage_margin_rate: this.props.pricing.percentage_margin_rate,
			percentage_brand_taxes: this.props.pricing.percentage_brand_taxes,
			half_wholesale_price: this.props.pricing.half_wholesale_price,
			wholesale_price: this.props.pricing.wholesale_price,
			percentage_half_big_price: this.props.pricing.percentage_half_big_price,
			percentage_wholesale_price: this.props.pricing.percentage_wholesale_price,
			total_accumulated_price: this.props.pricing.total_accumulated_price,
		})
		e.preventDefault()
	}

	render() {
		return (
			<Form fluid onSubmit={this.handleSubmit} onReset={this.handleReset}>
				<Row>
					<Col>
						<Form.Group as={Row} controlId='averageField'>
							<Form.Label column sm={3} >Prix moyen</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.average_price} onChange={e => this.setState({ average_price: e.target.value })} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId='costField'>
							<Form.Label column sm={3} >Prix d'achat</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.cost_price} onChange={e => this.setState({ cost_price: e.target.value })} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId='unitField'>
							<Form.Label column sm={3} >Prix unitaire</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.unit_pricing} onChange={e => this.setState({ unit_pricing: e.target.value })} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId='expenseField'>
							<Form.Label column sm={3} >Dépenses (en %)</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.percentage_expence} onChange={e => this.setState({ percentage_expence: e.target.value })} />
							</Col>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group as={Row} controlId='marginRateField'>
							<Form.Label column sm={3} >Taux de marge (en %)</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.percentage_margin_rate} onChange={e => this.setState({ percentage_margin_rate: e.target.value })} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId='brandTaxeField'>
							<Form.Label column sm={3} >Taux de marque (en %)</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.percentage_brand_taxes} onChange={e => this.setState({ percentage_brand_taxes: e.target.value })} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId='halfWholesalePriceField'>
							<Form.Label column sm={3} >Prix du demi-gros</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.half_wholesale_price} onChange={e => this.setState({ half_wholesale_price: e.target.value })} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId='wholesalePriceField'>
							<Form.Label column sm={3} >Prix du gros</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.wholesale_price} onChange={e => this.setState({ wholesale_price: e.target.value })} />
							</Col>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group as={Row} controlId='percWholesaleField'>
							<Form.Label column sm={3} >Taux de marge (en %)</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.percentage_wholesale_price} onChange={e => this.setState({ percentage_wholesale_price: e.target.value })} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId='percHalfBigField'>
							<Form.Label column sm={3} >Taux du demi-gros (en %)</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.percentage_half_big_price} onChange={e => this.setState({ percentage_half_big_price: e.target.value })} />
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId='totalField'>
							<Form.Label column sm={3} >Total Cumulé</Form.Label>
							<Col sm={6}>
								<Form.Control type='number' readOnly={this.props.readOnly} required value={this.state.total_accumulated_price} onChange={e => this.setState({ total_accumulated_price: e.target.value })} />
							</Col>
						</Form.Group>
					</Col>
				</Row>
				
				{ (this.props.update || this.props.new) &&
					<Row>
						<Col align='right'>
							<Button className='rounded-10 mg-r-10' type='submit'>Sauvegarder</Button>
							<Button className='rounded-10' type='reset'>Annuler</Button>
						</Col>
					</Row>
				}
			</Form>
			
		)
	}
}

export default PricingForm;