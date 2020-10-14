import React from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL,API_URL_CATEGORIE,API_URL_CONDITIONING, TOKEN } from "../../constants";

class NewProduitForm extends React.Component {

      state = {
        conditionings:[],
        categories:[],
        id:"",
        pk: 0,
        code: null,
        name: "",
        update_code: null,
        category: "",
        conditioning_purchase:null,
        conditioning_sale:null
      };


  componentDidMount() {

    //conditionings
    let initialConditionings=[];

    fetch(API_URL_CONDITIONING)
        .then(response => {
            return response.json();
        }).then(data => {
        initialConditionings = data.results.map((conditioning) => {
            return conditioning
        });
        console.log(initialConditionings);
        this.setState({
            conditionings: initialConditionings,
        });
    });


    //categories
    let initialCategories=[];

    fetch(API_URL_CATEGORIE)
        .then(response => {
            return response.json();
        }).then(data => {
        initialCategories = data.results.map((categorie) => {
            return categorie
        });
        console.log(initialCategories);
        this.setState({
            categories: initialCategories,
        });
    });


    if (this.props.produit) {
      const { id, pk, code,name, update_code,category,conditioning_purchase,conditioning_sale} =
       this.props.produit;
      console.log(id);
      this.setState({ id, pk, code,name, update_code,category,conditioning_purchase,conditioning_sale });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

  };

    createProduit = e => {

    e.preventDefault();

    let data = JSON.stringify({
    "code":this.state.code,
    "name":this.state.name,
    "update_code":this.state.update_code,
    "conditioning_purchase":this.state.conditioning_purchase,
    "conditioning_sale":this.state.conditioning_sale,
    "category":this.state.category
    });

    console.log(this.state);

    let config = {
      method: 'post',
      url: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+TOKEN
      },
      data : data
    };

    axios(config)
    .then(() => {
      console.log(this.state.category)
      this.props.resetState();
      this.props.toggle();
      this.props.handleOpen();
    })
    .catch( (error) => {
      console.log(error.response);
      this.props.handleOpenError();
      });
  };

  editProduit = e => {
    e.preventDefault();

    let data;
    data = JSON.stringify({
            "code":this.state.code,
            "name":this.state.name,
            "update_code":this.state.update_code,
            "conditioning_purchase":this.state.conditioning_purchase,
            "conditioning_sale":this.state.conditioning_sale,
            "category":this.state.category
        });

    axios.put(API_URL + this.state.id, data,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+TOKEN
      }
    }).then(() => {
      this.props.resetState();
      console.log("data: "+data);
      this.props.toggle();
      this.props.handleOpen();
    })
    .catch( (error) => {
      console.log("data: "+data);
      console.log(error.response);
      this.props.handleOpenError();
      });
  };

  defaultIfEmpty = value => {
    return value === "" ? null : value;
  };

  render() {
    let conditionings = this.state.conditionings;
    let optionItems = conditionings.map((conditioning) =>
                <option key={conditioning.name}>{conditioning.name}</option>
            );

    let categories = this.state.categories;
    let optionItemsCategorie = categories.map((categorie) =>
                <option key={categorie.name}>{categorie.name}</option>
            );
    return (
      <Form onSubmit={this.props.produit ? this.editProduit : this.createProduit}>
        <FormGroup>
          <Label for="code">Code:</Label>
          <Input
            type="text"
            name="code"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.code)}
          />
          <FormText color="muted">
              Personnaliser votre code, mais nous vous conseillons de nous laisser s'en charger
          </FormText>
        </FormGroup>
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
          <Label for="update_code">Autoriser la mise à jour du code:</Label>
          <Input
            type="select"
            name="update_code"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.update_code)}>
                <option></option>
                <option>YES</option>
                <option>NO</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="conditioning_purchase">Conditionnement à l'achat:</Label>
          <Input
            type="select"
            name="conditioning_purchase"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.conditioning_purchase)}>
                <option></option>
                {optionItems}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="conditioning_sale">Conditionnement à la vente:</Label>
          <Input
            type="select"
            name="conditioning_sale"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.conditioning_purchase)}>
                <option></option>
                {optionItems}
            </Input>
        </FormGroup>

        <FormGroup>
          <Label for="category">Catégorie:</Label>
          <Input
            type="select"
            name="category"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.category)}>
                <option></option>
                {optionItemsCategorie}
            </Input>
        </FormGroup>

        <Button>Envoyer</Button>
      </Form>
    );
  }
}

export default NewProduitForm;