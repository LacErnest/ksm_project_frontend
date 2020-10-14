import API from './config'


export const retrieve = (id) => {
    return API.get('category_descriptions/'+id+'/')
}

export const create = (prod) => {
    return API.post('category_descriptions/', prod)
}

export const update = (id, prod) => {
    return API.put('category_descriptions/'+id+'/', prod)
}

export const destroy = (id) => {
    return API.delete('category_descriptions/'+id+'/')
}
export const DescCategLang = (idCateg,codeLang) => {
    return API.get('categories/'+idCateg+'/category_descriptions/'+codeLang)
}