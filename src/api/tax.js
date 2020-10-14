import API from './config'

export const list = () => {
    return API.get('taxes/')
}

export const listProducts_Taxe = (taxe) => {
    return API.get('taxes/'+taxe.id+'/products')
}
export const create = (data) => {
    return API.post('taxes/', data)
}
export const update = (id, data) => {
    return API.put('taxes/' + id + '/', data)
}
export const destroy = (id) => {
    return API.delete('taxes/' + id + '/')
}

