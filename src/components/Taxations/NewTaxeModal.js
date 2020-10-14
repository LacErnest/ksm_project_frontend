import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody,ModalFooter } from "reactstrap";
import NewTaxeForm from "./NewTaxeForm";

import {MDBBtn,MDBTooltip} from "mdbreact";
import '../../index.css';

class NewTaxeModal extends Component {
  constructor(props) {
        
    super(props)

   
    this.reussite = this.reussite.bind(this);
    this.echec = this.echec.bind(this);
    
}
state = {
  modal: false,
  success: false,
  failure: false,
};

  

  toggle = () => {
    this.setState ({
      modal: !this.state.modal,
    });

  };
  reussite = () => {
    console.log('_o')
    this.setState ({
      modal:false,
      success: true,
    });

  };
  echec = () => {
    console.log('_u')
    this.setState ({
      modal:false,
      failure: true,
    });

  };
  handleCancel = () => {
		this.setState({
			success: false,
      failure: false,
      modal:false
		})
	}

  render() {
    const create = this.props.create;

    var title = "Edition de la Taxe";
    var button = (
        <MDBTooltip placement="bottom">
            <MDBBtn
             id='edition'
              onClick={this.toggle} 
           color="deep-orange" >
            <i className="menu-item-icon  icon ion-edit"></i>
            </MDBBtn>
            <div>Edition</div>
        </MDBTooltip>

    );
    if (create) {
      title = "Création d'une nouvelle Taxe";

      button = (
        <MDBTooltip placement="bottom">
            <MDBBtn
            id='ajout'
              color="deep-orange"
              className="float-right"
              onClick={this.toggle}
              //style={{ minWidth: "200px" }}
            >
                        <i className="menu-item-icon icon ion-plus-circled tx-22"></i>
       
            </MDBBtn>
            <div>Nouvelle Taxe</div>
        </MDBTooltip>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewTaxeForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              taxe={this.props.taxe}
              reussite={this.reussite}
              echec={this.echec}
            />
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.success} toggle={this.handleCancel}>
            <ModalHeader closeButton>
              Taxe {this.props.create ? 'created' : 'updated'} successfully!
            </ModalHeader>
            <ModalFooter>
              <Button className='rounded-10' variant='success' onClick={this.handleCancel} >Ok</Button>
            </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.failure} toggle={this.handleCancel} >
          <ModalHeader toggle={this.handleCancel}>Error!</ModalHeader>
          <ModalFooter>
          <Button className='rounded-10' variant='danger' onClick={this.handleCancel} >Ok</Button>
          </ModalFooter>        
        </Modal>
      
      </Fragment>
    );
  }
}

export default NewTaxeModal;