// Library
import React, { Component } from 'react';
import * as DetailAPI from '../../../../api/detail'
import FormData from 'form-data'

// Components
import { Container, Row, Col, Button, Form, Image} from 'react-bootstrap'


class DetailTab extends Component {
	
	state = {
		// Content
		detail: {},
		model: "",
		mark: "",
		weight: 0,
		conservation: "",
		origin: "",
		composition: "",

		// UI
		detailIsDefined: false,
		readOnly: true,
		newDetail: false,
		updateDetail: false,
		user: '',
	}


	componentDidMount() {		
		console.log('state', this.state)

		// fetching details from API
		DetailAPI.product(this.props.product.id)
			.then(res => {
				console.log('res detail: '+res)
				this.setState({ detail: res.data });
				if (res.data === {}) {
					this.setState({ detailIsDefined: false })
				}
				else {
					this.setState({
						// content
						model: res.data.model,
						mark: res.data.mark,
						conservation: res.data.conservation,
						weight: res.data.weight,
						origin: res.data.origin,
						composition: res.data.composition,
						
						// UI
						detailIsDefined: true,
					})
				}
			})
			.catch(err => {
				console.log(err)
				this.setState({detailIsDefined: false})
			})
	}

	handleDefine = () => {
		this.setState({
			detailIsDefined: true,
			readOnly: false,
			newDetail: true,
			updateDetail: false,
		})
	}

	handleModify = () => {
		this.setState({
			detailIsDefined: true,
			readOnly: false,
			updateDetail: true,
			newDetail: false,
		})
	}

	handleSubmit = (e) => {
		var data = new FormData()
		data.append('model', this.state.model)
		data.append('mark', this.state.mark)
		data.append('weight', this.state.weight)
		data.append('conservation', this.state.conservation)
		data.append('origin', this.state.origin)
		data.append('composition', this.state.composition)
		data.append('product', this.props.product.name)

		if (this.state.newDetail) {
			DetailAPI.create(data)
				.then(res => {
					console.log(res.data)
					this.setState({detail: res.data})
				})
				.catch(err => console.log(err))
		}

		if (this.state.updateDetail) {
			DetailAPI.update(this.state.detail.id, data)
				.then(res => {
					this.setState({detail: res.data})
				})
				.catch(err => console.log(err))
		}

		this.setState({
			newDetail: false,
			updateDetail: false,
			detailIsDefined: true,
			readOnly: true,
		})

		e.preventDefault()
	}


	handleReset = (e) => {
		if (this.state.newDetail) {
			this.setState({
				detailIsDefined: false,
				model: this.state.detail.model,
				mark: this.state.detail.mark,
				weight: this.state.detail.weight,
				conservation: this.state.detail.conservation,
				origin: this.state.detail.origin,
				composition: this.state.detail.composition,
			})
		}

		this.setState({
			newDetail: false,
			updateDetail: false,
			readOnly: true,
			model: this.state.detail.model,
			mark: this.state.detail.mark,
			weight: this.state.detail.weight,
			conservation: this.state.detail.conservation,
			origin: this.state.detail.origin,
			composition: this.state.detail.composition,
		})

		e.preventDefault()
	}
	
	handleTextChange = e => this.setState({ specification: e.target.value })

	render() {
		return (
			<>
				<Container fluid className='mg-t-30'>
					<Col>
						<Row>
							<Col sm={9}>
								<Form fluid onSubmit={this.handleSubmit} onReset={this.handleReset}>
									{
										this.state.detailIsDefined &&
									<Row>
									<Col>
										<Form.Group as={Row} controlId='modelField'>
											<Form.Label column sm={3} >Modele</Form.Label>
											<Col sm={8}>
													<Form.Control readOnly={this.state.readOnly} required value={this.state.model} onChange={e => this.setState({ model: e.target.value })} />
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId='markField'>
											<Form.Label column sm={3} >Marque</Form.Label>
											<Col sm={8}>
													<Form.Control readOnly={this.state.readOnly} required value={this.state.mark} onChange={e => this.setState({ mark: e.target.value })} /> 
											</Col>
											</Form.Group>
											<Form.Group as={Row} controlId='ConservationField'>
											<Form.Label column sm={3}>Conservation</Form.Label>
											<Col sm={8}>
												<Form.Control as='textarea' readOnly={this.state.readOnly} required value={this.state.conservation} onChange={e => this.setState({ conservation: e.target.value })} />
											</Col>
											</Form.Group>
									</Col>
									<Col>
										<Form.Group as={Row} controlId='weightField'>
											<Form.Label column sm={3}>Poids</Form.Label>
												<Col sm={8}>
												<Form.Control type='number' readOnly={this.state.readOnly} required value={this.state.weight} onChange={e => this.setState({ weight: e.target.value })} />
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId='OriginField'>
											<Form.Label column sm={3}>Origine</Form.Label>
												<Col sm={8}>
												<Form.Control readOnly={this.state.readOnly} required value={this.state.origin} onChange={e => this.setState({ origin: e.target.value })} />
											</Col>
										</Form.Group>
										<Form.Group as={Row} controlId='CompositionField'>
											<Form.Label column sm={3}>Composition</Form.Label>
											<Col sm={8}>
												<Form.Control as='textarea' readOnly={this.state.readOnly} required value={this.state.composition} onChange={e => this.setState({ composition: e.target.value })} />
											</Col>
											</Form.Group>
											
											
											{
												(this.state.updateDetail || this.state.newDetail) &&
												<Row>
													<Col align='right'>
														<Button className='rounded-10 mg-r-10' type='submit'>Sauvegarder</Button>
														<Button className='rounded-10' type='reset'>Annuler</Button>
													</Col>
												</Row>
											}
											{
												(this.state.detailIsDefined && !this.state.updateDetail && !this.state.newDetail) &&
												(<>
												<Col align='right'>
													<Button className='rounded-10 mg-r-10' onClick={this.handleModify}>Modifier</Button>
														{/* <DetailDelete detail={this.state.currentDetail} delete={this.deleteDetail}/> */}
													</Col>
												</>)
											}
											
											</Col>
											</Row>	
									}

									{
										!this.state.detailIsDefined &&	
										<Container>
											<Col className='text-center mg-t-50'>
												<h3 className='text-center'>Détail non défini.</h3>
												{/* <Row><Button className='rounded-10' onClick={this.handleDefine}>Definir?</Button></Row> */}
											</Col>
										</Container>
									}

								</Form>
							</Col>
							<Col align='right' sm={3}>
								<Image width='180px' height='180px' src='https://www.readlightnovel.org/uploads/posters/1546424063.jpg' />
							</Col>
						</Row>
						
						<Row>
							{
							(!this.state.detailIsDefined && !this.state.newDetail) &&
								<>
								<Col>
									<Button className='rounded-10 mg-r-10' onClick={this.handleDefine}>Definir?</Button>
								</Col>
								</>
							}
						</Row>
					</Col>
				</Container>
			</>
		)
	}
}

export default DetailTab