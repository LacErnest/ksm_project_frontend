import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import LangueList from "./LanguesList";
import NewLangueModal from "./NewLanguageModal";

import * as LangueAPI from '../../api/language'

class HomeLangue extends Component {
  state = {
    langues: []
  };

  componentDidMount() {
    this.resetState();
  }

  getLangues = () => {
    LangueAPI.list()
    .then(res => this.setState({langues: res.data.results}))
    .catch(err => console.log(err))
  };

  resetState = () => {
    this.getLangues();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <LangueList
              onClick={this.props.onClick}
              langues={this.state.langues}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewLangueModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomeLangue;