// Library
import React, { Component } from 'react';
import {destroy} from '../../../../api/description';

// Components
import { Button, Modal} from 'react-bootstrap';

class DescriptionDelete extends Component {

	state = {
		showModal: false,
		success: false,
		failure: false,
	}
	
	handleConfirm = (event) => {
		this.setState({showModal: true})
	}
	
	handleDelete = (event) => {
		console.log("Suppression de la description...");
		destroy(this.props.description.id)
			.then(res => this.setState({success: true}))
			.catch(err => this.setState({failure: true}))
        this.setState({ showModal: false })
		this.props.delete()
	}

	handleCancel = (event) => {
		this.setState({
			showModal: false,
			success: false,
			failure: false
		})
	}

	render() {
		return (
			<>
				<Button className='rounded-10' variant='danger' onClick={this.handleConfirm} >supprimmer</Button>

				<Modal size="sm" show={this.state.showModal} onHide={this.handleCancel}>
					<Modal.Header closeButton>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Voulez-vous vraiment supprimmer cette description?
					</Modal.Body>
					<Modal.Footer>
						<Button className='rounded-10' variant='danger' onClick={this.handleDelete} >OUI</Button>
						<Button className='rounded-10' variant="secondary" onClick={this.handleCancel}>ANNULER</Button>
					</Modal.Footer>
				</Modal>

				<Modal show={this.state.success} onHide={this.handleCancel}>
					<Modal.Header closeButton>
						<Modal.Title>Description supprimee!</Modal.Title>
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

export default DescriptionDelete;