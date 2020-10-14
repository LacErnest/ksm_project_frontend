import API from './config'

export const product = (id) => {
    return API.get('products/' + id + '/conditionnings')
}

export const list = () => {
    return API.get('product_packagings/')
}

export const retrieve = (id) => {
    return API.get('product_packagings/' + id + '/')
}

export const create = (prod) => {
    return API.post('product_packagings/', prod)
}

export const update = (id, prod) => {
    return API.put('product_packagings/' + id + '/', prod)
}

export const destroy = (id) => {
    return API.delete('product_packagings/' + id + '/')
}
