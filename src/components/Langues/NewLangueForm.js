import React from "react";
import { Button, Form, FormGroup,Input, Label } from "reactstrap";

import * as LangueAPI from '../../api/language'
class NewTaxeForm extends React.Component {

      state = {
        id:'',
        code:'',
        name:'',
       is_default:'',
      
      };


  componentDidMount() {
        if (this.props.langue) {
          const {id,code,name,is_default} =  this.props.langue;
          this.setState({id, code,name,is_default});
        }
                    }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

  };

    createLangue = (e) => {
      e.preventDefault();
console.log(this.props+"jjjjjjjj")
    let dat = JSON.stringify({
      'code':this.state.code,
      'name':this.state.name,
      'is_default':this.state.is_default
    });
    LangueAPI.create(dat)
    .then(() => {
      this.props.toggle();
      this.props.reussite();
      this.props.resetState();
    })
    .catch( ()=>{
      this.props.echec();
    } );
  };

  editLangue = e => {
    e.preventDefault();

    let data;
    data = JSON.stringify({
      'code':this.state.code,
      'name':this.state.name,
      'is_default':this.state.is_default
        });

    LangueAPI.update(this.state.id,data)
    .then(() => {
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
      <Form onSubmit={this.props.langue ? this.editLangue : this.createLangue}>
        <FormGroup>
            <Label for="code">Code:</Label>
            <Input
              type="text"
              name="code"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.code)}
            />
          </FormGroup>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="is_default">Description:</Label>
          <Input
            type="select"
            name="is_default"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.is_default)}>
                <option>YES</option>
                <option>NO</option>
            </Input>
          
        </FormGroup>
        <Button>Envoyer</Button>
      </Form>
    );
  }
}

export default NewTaxeForm;