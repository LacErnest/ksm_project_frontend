import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import ProduitList from "./ProduitList";
import NewProduitModal from "./NewProduitModal";

import axios from "axios";

import { API_URL } from "../../constants";

class HomeProduit extends Component {
  state = {
    produits: []
  };

  componentDidMount() {
    this.resetState();
  }

  getProduits = () => {
    axios.get(API_URL).then(res => {this.setState({ produits: res.data.results })});

  };

  resetState = () => {
    this.getProduits();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <ProduitList
              onClick={this.props.onClick}
              produits={this.state.produits}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewProduitModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomeProduit;