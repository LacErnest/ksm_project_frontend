import API from './config'

export const product = (id) => {
    return API.get('products/'+id+'/product_descriptions')
}
export const productProdLang = (idProd,codeLang) => {
    return API.get('products/'+idProd+'/product_descriptions/'+codeLang)
}

export const list = () => {
    return API.get('product_descriptions/')
}

export const retrieve = (id) => {
    return API.get('product_descriptions/'+id+'/')
}

export const create = (prod) => {
    return API.post('product_descriptions/', prod)
}

export const update = (id, prod) => {
    return API.put('product_descriptions/'+id+'/', prod)
}

export const destroy = (id) => {
    return API.delete('product_descriptions/'+id+'/')
}