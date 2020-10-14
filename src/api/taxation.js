import API from './config'

export const product = (id) => {
    return API.get('products/' + id + '/taxes')
}

export const list = (prod) => {
    console.log('Appel api taxation avec pour parametre prod=', prod)
    if (prod) {
        return API.get('product_taxations/?product='+prod)
    }
    else {
        return API.get('product_taxations/')
    }
}

export const retrieve = (id) => {
    return API.get('product_taxations/' + id + '/')
}

export const create = (prod) => {
    return API.post('product_taxations/', prod)
}

export const update = (id, prod) => {
    return API.put('product_taxations/' + id + '/', prod)
}

export const destroy = (id) => {
    return API.delete('product_taxations/' + id + '/')
}

export const taxationProdTaxe = (idProd,idTaxe) => {
    return API.get('product_taxations/?product=' + idProd +'&tax='+idTaxe)
}