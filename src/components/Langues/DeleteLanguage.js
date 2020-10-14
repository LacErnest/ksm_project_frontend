import React, { Component} from "react";
// Components
import {MDBBtn,MDBIcon,MDBTooltip} from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody,ModalFooter } from "reactstrap";
import * as LangueAPI from '../../api/language';
import '../../index.css';
class DeleteLangue extends Component {

    state = {
		showModal: false,
		success: false,
		failure: false,
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

  deleteLangue = (e) => {
         e.preventDefault();

        LangueAPI.destroy(this.props.pk).then(res =>{ 
            this.setState({ showModal: false });
            this.setState({success: true});
            this.props.resetState();
        }).catch(err =>{
            this.setState({ showModal: false });
            this.setState({failure: true});
        })
           

  };

  render() {
    return (
        <>
       <MDBTooltip placement="bottom">
            <MDBBtn color="deep-orange" 
              id='suppression'
            onClick={this.handleConfirm}>
            <i className="menu-item-icon    icon ion-trash-b tx-14  "></i>
            </MDBBtn>
            <div>Supprimer</div>
     </MDBTooltip>
     <Modal size="sm" isOpen={this.state.showModal} toggle={this.handleCancel}>
            <ModalHeader toggle={this.handleCancel}>
                Confirmation
            </ModalHeader>
            <ModalBody>
                Voulez-vous vraiment supprimmer cette Langue?
            </ModalBody>
            <ModalFooter>
                <Button color='danger' className="btn-primary"  onClick={this.deleteLangue} >OUI</Button>
                <Button className='rounded-10'  variant="secondary" onClick={this.handleCancel}>ANNULER</Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.success} toggle={this.handleCancel}>
            <ModalHeader toggle={this.handleCancel}>
                Langue supprimee!
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
    </>
    );
  }
}

export default DeleteLangue;