// Libraries
import React, { Component, Fragment } from 'react';
import * as TaxAPI from '../../../../api/tax'
import * as TaxationAPI from '../../../../api/taxation'
import FormData from 'form-data'

// Components
import { Container, Row, Col, Button, Image} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

	class TaxationTab extends Component {
		
		state = {
			// Content
			availableTaxes: [],
			activeTaxes: [],
			chosenTax: '',
			taxations: [],

			// UI
			readOnly: true,
		}

		async componentDidMount() {
			// fetching the available taxes from API
			await TaxAPI.list()
				.then(res => {
					this.setState({
						availableTaxes: res.data.results,
					})
				})
				.catch(err => console.log(err))
			
			await TaxationAPI.list(this.props.product.id)
				.then(res => this.setState({taxations: res.data.results}))
				.catch(err => console.log(err))	
			
			// activate the taxes of the current product
			// 1. fetch the list of active taxes
			await TaxationAPI.product(this.props.product.id)
				.then(res => {
					this.setState({activeTaxes: res.data})
				})
				.catch(err => console.log(err))
			// 2. add a 'active' boolean property to each available tax
			let table = this.state.availableTaxes.map(tax => {
				if (this.state.activeTaxes.find(e => e.id === tax.id)) {
					tax.active = true
				}
				else {
					tax.active = false
				}
				return tax
			})
			this.setState({availableTaxes: table})
		}

		handleAdd = (tax) => {
			this.setState({
				availableTaxes: this.state.availableTaxes.map(e => (tax.id === e.id) ? tax.active = true : e)
			})			
		}

		handleDelete = (tax) => {
			this.setState({
				availableTaxes: this.state.availableTaxes.map(e => (tax.id === e.id) ? tax.active = false : e)
			})			
		}

		handleToggle = (e) => {
			let tax = JSON.parse(e.target.value)

			if (tax.active) {
				// delete the tax
				// Searching the corresponding taxation
				// console.log('tax', tax)
				// console.log('taxations', this.state.taxations)
				// console.log(this.props.product)
				let taxation = this.state.taxations.find(elt => elt.tax === tax.name)

				TaxationAPI.destroy(taxation.id)
					.then(res => {
						this.setState(
							{
								availableTaxes: this.state.availableTaxes.map(elt => {
									if (elt.id === tax.id) {
										elt.active = false
									}
									return elt
								}),
								activeTaxes: this.state.activeTaxes.filter(elt => elt.id !== tax.id),
								taxations: this.state.taxations.filter(elt => elt.id !== taxation.id),
							}
								
						)
					})
					.catch(err => console.log(err))
			}
			else {
				// activate the tax
				var data = new FormData()
				data.append('tax', tax.name)
				data.append('product', this.props.product.name)

				TaxationAPI.create(data)
					.then(res => {
						this.setState(
							{
								availableTaxes: this.state.availableTaxes.map(elt => {
									if (elt.id === tax.id) {
										elt.active = true
									}
									return elt
								}),
								activeTaxes: [...this.state.activeTaxes, tax],
								taxations: [...this.state.taxations, res.data],
							}
						)
					})
					.catch(err => console.log(err))
			
			}
		}

		render() {

			const columns = [
				{
					dataField: 'name',
					text: 'Nom',
					sort: true,
				},
				{
					dataField: 'value',
					text: 'Valeur',
					sort: true,
				},
				{
					dataField: 'description',
					text: 'Description',
					sort: true,
				},
				{
					dataField: 'activate',
					text: 'Activer',
				},
			]

			const rows = [
				...this.state.availableTaxes.map(tax => {
					return {
						name: tax.name,
						value: tax.value,
						description: tax.description,
						activate: <Fragment>
							<Button className='rounded-10' variant={tax.active ? 'success' : 'danger'} 	value={JSON.stringify(tax)} onClick={this.handleToggle}>{tax.active?'Actif':'Inactif'}</Button>
						</Fragment>
					}
				})
			]
	
			const customTotal = (from, to, size) => (
				<span className="react-bootstrap-table-pagination-total">
				  Taxes { from } à { to } sur { size }
				</span>
			);
			  
			const options = {
				paginationSize: 5,
				pageStartIndex: 0,
				firstPageText: 'First',
				prePageText: 'Back',
				nextPageText: 'Next',
				lastPageText: 'Last',
				nextPageTitle: 'First page',
				prePageTitle: 'Pre page',
				firstPageTitle: 'Next page',
				lastPageTitle: 'Last page',
				showTotal: true,
				paginationTotalRenderer: customTotal,
				disablePageTitle: true,
				sizePerPageList: [
					{ text: '5', value: 5 },
					{ text: '10', value: 10 },
					{ text: '15', value: 15 },
					{ text: 'All', value: this.state.availableTaxes.length },
				]
			};
	
			const rowEvents = {
				onClick: (e, row, rowIndex) => {
					console.log(row)
					this.setState({
						showInformation: true,
						currentProduct: row,
						changingProduct: true,
					});
					this.forceUpdate();
					
				},
			};
	
			const { SearchBar } = Search

			return (
				<>
					<Container fluid className='mg-t-30'>
						<Col>
							<Row>
								<Col sm={9}>
									
									<ToolkitProvider
										keyField='name'
										data={ rows }
										columns={columns}
										responsive
										hover
										stripped
										search
									>
										{
											props => (
												<div>
													<SearchBar {...props.searchProps} />
													<BootstrapTable 
														{...props.baseProps}
														pagination={ paginationFactory(options) }
														noDataIndication="List vide!"
														rowEvents={ rowEvents }
													/>
												</div>
											)
										}	
									</ToolkitProvider>

								</Col>
								<Col align='right' sm={3}>
									<Image width='180px' height='180px' src='https://www.readlightnovel.org/uploads/posters/1546424063.jpg' />
								</Col>
							</Row>
							
							<Row>
								{
								(this.state.user === 'honore' && this.state.detailIsDefined) &&
									(<>
									<Col align='right'>
										<Button  className='rounded-10 mg-r-10' onClick={this.handleModify}>Modifier</Button>
											{/* <DetailDelete detail={this.state.currentDetail} delete={this.deleteDetail}/> */}
										</Col>
									</>)
								}
							</Row>
						</Col>
					</Container>
				</>
			)
		}
	}

	export default TaxationTab;