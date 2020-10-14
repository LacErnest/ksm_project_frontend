import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewProduitForm from "./NewProduitForm";
import ModalSuccess from "./ModalSuccess";
import ModalError from "./ModalError";
import {MDBBtn,MDBIcon,MDBTooltip} from "mdbreact";

class NewProduitModal extends Component {

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  state = {
    modal: false,
    success: false,
    error: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleClose = () => {
    this.setState({
      modal: false,
      success: false,
      error: false,
    });
   // console.log("openModal:"+ this.state.openModal);
  };

  handleOpen = () => {
    this.setState({
      modal: false,
      success: true,
    });
   // console.log("openModal:"+ this.state.openModal);
  };

  handleOpenError = () => {
    this.setState({
      modal: false,
      error: true,
    });
   // console.log("openModal:"+ this.state.openModal);
  };

  render() {
    const create = this.props.create;

    var title = "Edition du Produit";
    var button = (
        <MDBTooltip placement="bottom">
            <MDBBtn onClick={this.toggle}  size="sm" color="deep-orange" id="edition">
                 <i className="menu-item-icon  icon ion-edit tx-14"></i>
            </MDBBtn>
            <div>Edition</div>
        </MDBTooltip>

    );
    if (create) {
      title = "Création d'un nouveau Produit";

      button = (
        <MDBTooltip placement="bottom">
            <MDBBtn
              id="ajout"
              color="deep-orange"
              size="sm"
              className="float-right"
              onClick={this.toggle}
              //style={{ minWidth: "200px" }}
            >
                <i className="menu-item-icon icon ion-plus-circled tx-22"></i>
            </MDBBtn>
            <div>Nouveau Produit</div>
        </MDBTooltip>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop="static">
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewProduitForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              handleOpen={this.handleOpen}
              handleOpenError={this.handleOpenError}
              produit={this.props.produit}
            />
          </ModalBody>
        </Modal>
        <ModalSuccess create={this.props.create}  openModal={this.state.success} handleClose={this.handleClose} />
        <ModalError openModal={this.state.error} handleClose={this.handleClose} />
      </Fragment>


    );
  }
}

export default NewProduitModal;