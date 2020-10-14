// Library
import React, { Component } from 'react';
import * as LanguageAPI from '../../../../api/language'
import * as DescriptionAPI from '../../../../api/description'
import FormData from 'form-data'

// Components
import { Container, Row, Col, Button, Form, Image} from 'react-bootstrap'
import DescriptionDelete from './DescriptionDelete'


class DescriptionTab extends Component {
	
	state = {
		// Content
		availableLanguages: [],
		descriptions: [],
		language: {},
		currentDescription: {},
		specification: '',
		description: '',

		// UI
		descriptionIsDefined: true,
		readOnly: true,
		newDescription: false,
		updateDescription: false,
		user: '',
	}


	async componentDidMount() {
		// fetching availableLanguages of the API and setting the default language as language
		await LanguageAPI.list()
			.then(res => {
				const defaultLanguage = res.data.results.find(elt => elt.is_default === 'YES')

				this.setState({
					availableLanguages: res.data.results,
					language: res.data.results[0].name,
				})
			})
			.catch(err => console.log(err))
		
		
		// fetching descriptions from API
		await DescriptionAPI.product(this.props.product.id)
			.then(res => {
				this.setState({ descriptions: res.data });
				
				const desc = res.data.find(elt => elt.language === this.state.language)
				if (desc === undefined) {
					this.setState({
						//UI
						descriptionIsDefined: false,
					})
				}
				else {
					this.setState({
						// Content
						currentDescription: desc,
						specification: desc.specification,
						description: desc.description,

						// UI
						descriptionIsDefined: true,
					})
				}
			})
			.catch(err => console.log(err))
	

	}

	handleLanguageChange = (e) => {
		console.log(e.target.value)
		this.setState({ language: e.target.value })
		const desc = this.state.descriptions.find(elt => elt.language === e.target.value)
		if (desc) {
			this.setState({
				description: desc.description,
				specification: desc.specification,
				descriptionIsDefined: true,
				readOnly: true,
				newDescription: false,
				updateDescription: false,
				user: desc.user,
				currentDescription: desc,
			})
		}
		else {
			this.setState({
				description: '',
				specification: '',
				descriptionIsDefined: false,
				readOnly: true,
				newDescription: false,
				updateDescription: false,
				currentDescription: {},
			})
		}
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
		data.append('product', this.props.product.name)

		if (this.state.newDescription) {
			DescriptionAPI.create(data)
				.then(res => {
					console.log(res.data)
					this.setState({
						descriptions: [...this.state.descriptions, res.data],
						newDescription: false,
						currentDescription: res.data,
					})
				})
				.catch(err => console.log(err))
		}

		if (this.state.updateDescription) {
			const desc = this.state.descriptions.find(d => d.language === this.state.language)
			DescriptionAPI.update(desc.id, data)
				.then(res => {
					var copy = [...this.state.descriptions]
					const index = copy.findIndex(d => d.language === this.state.language)
					copy[index].specification = this.state.specification
					copy[index].description = this.state.description
					this.setState({
						descriptions: copy,
						updateDescription: false,
						currentDescription: res.data,
					})
				})
				.catch(err => console.log(err))
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
		var res = this.state.descriptions.filter(elt => elt.id !== this.state.currentDescription.id)
		this.setState({
			descriptions: res,
			newDescription: false,
			updateDescription: false,
			descriptionIsDefined: false,
			currentDescription: {},
		})
	}

	render() {

		return (
			<>
				<Container fluid className='mg-t-30'>
					<Col>
						<Row md={2}>
							<Col sm={9}>
								<Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
									<Form.Group as={Row} controlId='languageField'>
										<Form.Label column sm={2} >Langue</Form.Label>
										<Col sm={8}>
											<Form.Control as='select' custom defaultValue='FRANCAIS' onChange={this.handleLanguageChange}>
												{this.state.availableLanguages.map(elt => (
													<option>{elt.name}</option>
												))}
											</Form.Control>
										</Col>
									</Form.Group>

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
														<Button className='rounded-10 mg-r-10' type='submit'>Sauvegarder</Button>
														<Button className='rounded-10' type='reset'>Annuler</Button>
													</Col>
												</Row>
											}
											{
											(this.state.descriptionIsDefined && !this.state.updateDescription && !this.state.newDescription) &&
												(<>
												<Col align='right'>
													<Button  className='rounded-10 mg-r-10' onClick={this.handleModify}>Modifier</Button>
														<DescriptionDelete description={this.state.currentDescription} delete={this.deleteDescription}/>
													</Col>
												</>)
											}
									</>
									}

									{
										(!this.state.descriptionIsDefined && !this.state.newDescription) &&
										<Container>
											<Col className='text-center mg-t-50'>
												<h3 className='text-center'>Description non définie pour cette langue.</h3>
												{/* <Row><Button className='rounded-10' onClick={this.handleDefine}>Definir?</Button></Row> */}
											</Col>
										</Container>
									}

								</Form>
								{
							(!this.state.descriptionIsDefined && !this.state.newDescription && !this.state.updateDescription) &&
								(<>
										<Col className='mg-t-100' align='right'>
											<Button className='rounded-10' onClick={this.handleDefine}>Definir?</Button>
											{/* <DetailDelete detail={this.state.currentDetail} delete={this.deleteDetail}/> */}
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

export default DescriptionTab