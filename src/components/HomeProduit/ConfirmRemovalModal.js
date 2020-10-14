import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter, ModalBody } from "reactstrap";
import {MDBBtn,MDBIcon,MDBTooltip} from "mdbreact";
import axios from "axios";

import { API_URL,TOKEN } from "../../constants";

class ConfirmRemovalModal extends Component {




  state = {
    modal: false,
    success:false,
    error:false,
  };

  toggle = () => {
    this.setState({
      modal: true
    });
  };

  close = () => {
    this.setState({
      success: false,
      modal: false,
      error:false,
    });
  };

  /*open = () => {
    this.setState({
      success: true,
      modal: false,
    });
   // console.log("openModal:"+ this.state.openModal);
  };

  openError = () => {
    this.setState({
      modal: false,
      error: true,
    });
   // console.log("openModal:"+ this.state.openModal);
  };*/

  deleteProduit = (e) => {

    e.preventDefault();

    axios.delete(API_URL + this.props.pk,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+TOKEN
      }
    })
    .then((res) => {

      this.props.resetState();
      console.log("res: "+ res);
      this.setState({modal: false,success:true});
      console.log("state: "+this.state.success+"  state:"+this.state.modal);
    })
    .catch(err=>{

        this.setState({modal: false,error:true});

        console.log(err.response);
    })
  };

  render() {
    return (
      <Fragment>
        <MDBTooltip placement="bottom">
            <MDBBtn color="deep-orange" size="sm" id="suppression" onClick={this.toggle}>
                 <i className="menu-item-icon    icon ion-trash-b tx-14  "></i>
            </MDBBtn>
            <div>Supprimer</div>
        </MDBTooltip>
        <Modal  size="sm" isOpen={this.state.modal} toggle={this.close} backdrop="static">
          <ModalHeader toggle={this.close}>
           Voulez vous vraiment supprimer ce produit?
          </ModalHeader>

          <ModalFooter>
           
            <Button
              color='danger' className="btn-primary"
              onClick={this.deleteProduit}
            >
              OUI
            </Button>
            <Button variant="secondary" onClick={this.close}>
              ANNULER
            </Button>
          </ModalFooter>
        </Modal>


        <Modal size="sm" isOpen={this.state.success} toggle={this.close} backdrop="static">
                <ModalHeader toggle={this.close}>
                    Succès
                </ModalHeader>
                <ModalBody>
                    La suppression du produit est effective !
                </ModalBody>
                <ModalFooter>
                    <Button variant="success" onClick={this.close}>
                        OK
                    </Button>
                </ModalFooter>
        </Modal>

        <Modal size="sm" isOpen={this.state.error} toggle={this.close} backdrop="static">
                <ModalHeader toggle={this.close}>
                    Echec
                </ModalHeader>
                <ModalBody>
                    Une erreur est survenue lors de la suppression du produit !
                </ModalBody>
                <ModalFooter>
                    <Button variant="error" onClick={this.close}>
                        Fermer
                    </Button>
                </ModalFooter>
        </Modal>
      </Fragment>

    );
  }
}

export default ConfirmRemovalModal;