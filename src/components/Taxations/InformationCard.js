// Libraries
import React, {Component} from 'react'


// Components
import {Card,Tab, Tabs} from 'react-bootstrap'

//component UI
import DetailProducts from './DetailProducts'



export class InformationCard extends Component {
	
	render() {
		return (
			<Card className='mg-t-20'>
				<Card.Header>
					<Card.Title>PRODUITS ASSOCIES A LA TAXE :   {this.props.taxe.name} </Card.Title>
					
				</Card.Header>

				<Card.Body>
					<Tabs fill variant='pills' defaultActiveKey='product'>
						
						<Tab eventKey='product' title='Products'>
							 <DetailProducts taxe={this.props.taxe} products={this.props.products} resetProducts={this.props.resetProducts}/> 
					
						</Tab>
						
					</Tabs>
				</Card.Body>
			</Card>
		)
	}
}

export default InformationCard;