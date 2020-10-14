/*
 *  file: product.js
 *  description: Contains the function used to fetch the list of all products from API
 */


// Libraries
import API from './config'


export const list = () => {
    return API.get('products/')
}

export const listTaxes = (idProd) => {
    return API.get('products/'+idProd+'/taxes')
}