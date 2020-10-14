import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


class ModalError extends Component{

    render(){

        return (
            <Modal size="sm"
                isOpen={this.props.openModal}
                toggle={this.props.handleClose}
                backdrop="static"
            >
                <ModalHeader toggle={this.props.handleClose}>
                    Erreur
                </ModalHeader>
                <ModalBody>
                    Une erreur est survenue
                </ModalBody>
                <ModalFooter>
                    <Button variant="error" onClick={this.props.handleClose}>
                        Fermer
                    </Button>
                </ModalFooter>
            </Modal>
        );

    }

}

export default ModalError;