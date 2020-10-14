// Libraries
import React, { Component } from 'react'

// Styles
import './tabulation.css'

// Components
import {Card, Tab, Tabs} from 'react-bootstrap'
import DetailTab from '../Detail/DetailTab'
import DescriptionTab from '../Description/DescriptionTab'
import IllustrationTab from '../Illustration/IllustrationTab'
import PricingTab from '../Pricing/PricingTab'
import TaxationTab from '../Taxation/TaxationTab'
import ConditionningTab from '../Conditionning/ConditionningTab'

class InformationCard extends Component {

	render() {
		return (
			<Card className='mg-t-20'>
				<Card.Header>
					<Card.Title>INFORMATIONS {this.props.product.name} {this.props.product.code}</Card.Title>
					
				</Card.Header>

				<Card.Body>
					<Tabs className='tab' fill variant='tabs' defaultActiveKey='detail'>
						
						<Tab eventKey='detail' title='Détail'>
							<DetailTab product={this.props.product}/>
						</Tab>
						
						<Tab eventKey='description' title='Description'>
							<DescriptionTab product={this.props.product}/>
						</Tab>

						{/* <Tab eventKey='conditionning' title='Packaging'>
							<ConditionningTab product={this.props.product} />
						</Tab>
						
						<Tab eventKey='illustration' title='Illustration'>
							<IllustrationTab product={this.props.product}/>
						</Tab> */}
						
						<Tab eventKey='pricing' title='Tarification'>
							<PricingTab product={this.props.product}/>
						</Tab>
						
						<Tab eventKey='taxation' title='Taxes'>
							<TaxationTab product={this.props.product}/>
						</Tab>
					</Tabs>
				</Card.Body>
			</Card>
		)
	}
}

export default InformationCard;