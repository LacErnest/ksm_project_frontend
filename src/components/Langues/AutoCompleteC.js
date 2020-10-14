import React, { Component } from 'react';
import axios from 'axios';

// Import the Autocomplete Component
import Autocomplete from 'react-autocomplete';

export default class App extends Component {

    constructor(props) {
        
        super(props)

        // Set initial State
        
        
        
        this.state = {
            categorie :null,
            value: "",
            autocompleteData: []
        };

        // Bind `this` context to functions of the class
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
    }


    /**
     * Updates the state of the autocomplete data with the remote data obtained via AJAX.
     * 
     * @param {String} searchText content of the input that will filter the autocomplete data.
     * @return {Nothing} The state is updated but no value is returned
     */
    retrieveDataAsynchronously(searchText){

        // Url of your website that process the data and returns a
        let url = `https://anselme.pythonanywhere.com/product-api/categories/?search=${searchText}`;
        axios.get(url)
        .then(res=>{
            if(res.status==200)
            {
        this.setState({autocompleteData:res.data.results})
        console.log("etetete")
        console.log(res.data)}
        console.log(this.state.autocompleteData)
        }).catch(err => console.log(err))
        
        
    }
    
    /**
     * Callback triggered when the user types in the autocomplete field
     * 
     * @param {Event} e JavaScript Event
     * @return {Event} Event of JavaScript can be used as usual.
     */
    onChange(e){
        this.setState({
            value: e.target.value
        });

        /**
         * Handle the remote request with the current text !
         */
        this.retrieveDataAsynchronously(e.target.value);

        console.log("The Input Text has changed to ", e.target.value);
    }

    /**
     * Callback triggered when the autocomplete input changes.
     * 
     * @param {Object} val Value returned by the getItemValue function.
     * @return {Nothing} No value is returned
     */
    onSelect(val){
        this.setState({
            value: val
        });
        console.log(this.state.autocompleteData)
        var categorie = this.state.autocompleteData.find(elt=>elt.name==val)

        this.props.handleCategorieChange(categorie)
       
        console.log("Option from 'database' selected : ", val);
    }

    /**
     * Define the markup of every rendered item of the autocomplete.
     * 
     * @param {Object} item Single object from the data that can be shown inside the autocomplete
     * @param {Boolean} isHighlighted declares wheter the item has been highlighted or not.
     * @return {Markup} Component
     */
    renderItem(item, isHighlighted){
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.code}-- {item.name}
            </div>   
        ); 
    }

    /**
     * Define which property of the autocomplete source will be show to the user.
     * 
     * @param {Object} item Single object from the data that can be shown inside the autocomplete
     * @return {String} val
     */
    getItemValue(item){
        // You can obviously only return the Label or the component you need to show
        // In this case we are going to show the value and the label that shows in the input
        // something like "1 - Microsoft"
        return `${item.name}`;
    }

  style =
  {
     borderRadius: '3px',
     boxShadow: '2 2px 12px rgba(1, 0, 0, 0.1)',
     background: 'rgba(255, 255, 255, 0.9)',
     padding: '2px 0',
     fontSize: '90%',
     position: 'absolute',
     left: '16px',
     top: '30px',
     overflowY: 'auto',
     maxHeight: 100, // TODO: don't cheat, let it flow to the bottom
   }
 render() {
        return (
            <div>
                <Autocomplete
                    getItemValue={this.getItemValue}
                    items={this.state.autocompleteData}
                    renderItem={this.renderItem}
                    value={this.state.value}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    menuStyle={this.style}
                    inputProps={{ style: {  width: '200px',height: '25px',borderRadius: '3px',  background:'#DCDCDC'}, placeholder: 'Entrez le code du produit'}}
                />
            </div>
        );
    }
}
