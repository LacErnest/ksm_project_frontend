import React from "react";
import { Button, Form, FormGroup,Input, Label } from "reactstrap";

import * as TaxeAPI from '../../api/tax'
class NewTaxeForm extends React.Component {

      state = {
        id:'',
        name:'',
        value:null,
        description:'',
      
      };


  componentDidMount() {
        if (this.props.taxe) {
          const {id,name,value, description} =  this.props.taxe;
          this.setState({id, name,value,description});
        }
                    }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

  };

    createTaxe = (e) => {
      e.preventDefault();
console.log(this.props+"jjjjjjjj")
    let dat = JSON.stringify({
      'name':this.state.name,
      'value':this.state.value,
      'description':this.state.description
    });
    TaxeAPI.create(dat)
    .then(() => {
      this.props.toggle();
      this.props.reussite();
      this.props.resetState();
    })
    .catch( ()=>{
      this.props.echec();
    } );
  };

  editTaxe = e => {
    e.preventDefault();

    let data;
    data = JSON.stringify({
      'name':this.state.name,
      'value':this.state.value,
      'description':this.state.description
        });

    TaxeAPI.update(this.state.id,data).
    then(() => {
      this.props.resetState();
      console.log("data: "+data);
      this.props.toggle();
      this.props.reussite();
    })
    .catch( ()=>{
      this.props.echec();
     } );
  };


  defaultIfEmpty = value => {
    return value === "" ? null : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.taxe ? this.editTaxe : this.createTaxe}>
        <FormGroup>
            <Label for="name">Nom:</Label>
            <Input
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.name)}
            />
          </FormGroup>
        <FormGroup>
          <Label for="value">Valeur:</Label>
          <Input
            type="float"
            name="value"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description:</Label>
          <Input
            type="textarea"
            name="description"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.description)}
          />
        </FormGroup>
        <Button>Envoyer</Button>
      </Form>
    );
  }
}

export default NewTaxeForm;