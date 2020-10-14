import API from './config'

export const product = (id) => {
    return API.get('products/' + id + '/detail')
}

export const list = () => {
    return API.get('product_details/')
}

export const retrieve = (id) => {
    return API.get('product_details/' + id + '/')
}

export const create = (prod) => {
    return API.post('product_details/', prod)
}

export const update = (id, prod) => {
    return API.put('product_details/' + id + '/', prod)
}

export const destroy = (id) => {
    return API.delete('product_details/' + id + '/')
}
