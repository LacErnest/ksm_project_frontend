import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import TaxeList from "./TaxesList";
import NewTaxeModal from "./NewTaxeModal";

import * as TaxeAPI from '../../api/tax'
import '../../index.css';

class HomeTaxe extends Component {
  state = {
    taxes: []
  };

  componentDidMount() {
    this.resetState();
  }

  getTaxes = () => {
    TaxeAPI.list()
    .then(res => this.setState({taxes: res.data.results}))
    .catch(err => console.log(err))
  };

  resetState = () => {
    this.getTaxes();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <TaxeList
              onClick={this.props.onClick}
              taxes={this.state.taxes}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewTaxeModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomeTaxe;