import axios from 'axios'

export default axios.create({
    baseURL: `https://anselme.pythonanywhere.com/product-api/`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token f67d02ef7854fdd8cc6eaea11082257051cf6dc6',
    }
})
