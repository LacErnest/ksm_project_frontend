import API from './config'

export const product = (id) => {
    return API.get('products/' + id + '/pricing/')
}

export const list = () => {
    return API.get('pricing/')
}

export const retrieve = (id) => {
    return API.get('pricing/' + id + '/')
}

export const create = (prod) => {
    return API.post('pricing/', prod)
}

export const update = (id, prod) => {
    return API.put('pricing/' + id + '/', prod)
}

export const destroy = (id) => {
    return API.delete('pricing/' + id + '/')
}