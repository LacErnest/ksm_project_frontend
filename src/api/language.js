import API from './config'

export const list = () => {
    return API.get('languages/')
}
export const create = (data) => {
    return API.post('languages/', data)
}
export const update = (id, data) => {
    return API.put('languages/' + id + '/', data)
}
export const destroy = (id) => {
    return API.delete('languages/' + id + '/')
}

export const listProductLangue = (id) => {
    return API.delete('languages/' + id + '/products')
}

export const listCategoryLangue = (id) => {
    return API.delete('languages/' + id + '/categories')
}