// Libraries
import React, {Component} from 'react'


// Components
import {Card,Tab, Tabs} from 'react-bootstrap'

//component UI
import DetailProducts from './DetailProducts'
import DetailCategories from './DetailCategories'


export class InformationCard extends Component {
	
	render() {
		return (
			<Card className='mg-t-20'>
				<Card.Header>
					<Card.Title>INFORMATIONS {this.props.langue.name} {this.props.langue.code}</Card.Title>
					
				</Card.Header>

				<Card.Body>
					<Tabs fill variant='pills' defaultActiveKey='product'>
						
						<Tab eventKey='product' title='Products'>
							 <DetailProducts langue={this.props.langue} products={this.props.products}/> 
					
						</Tab>
						
						<Tab eventKey='category' title='Categories'>
							 <DetailCategories langue={this.props.langue} categories={this.props.categories}/> 
							
						</Tab>
						
						
					</Tabs>
				</Card.Body>
			</Card>
		)
	}
}

export default InformationCard;