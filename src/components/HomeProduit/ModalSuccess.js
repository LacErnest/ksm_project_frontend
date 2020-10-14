import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from "reactstrap";


class ModalSuccess extends Component{

    render(){

        return (
            <Modal size="sm"
                isOpen={this.props.openModal}
                toggle={this.props.handleClose}
                backdrop="static"
            >
                <ModalHeader toggle={this.props.handleClose}>
                    Succès
                </ModalHeader>
                <ModalBody>
                    Le Produit a été {this.props.create ? 'créé' : 'mis à jour' }
                </ModalBody>
                <ModalFooter>
                    <Button variant="success" onClick={this.props.handleClose}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        );

    }

}

export default ModalSuccess;