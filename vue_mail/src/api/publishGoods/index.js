import axios from 'axios'

const postProduct = form =>
    axios.post('/api/v1/products', form).then(res => res.data)

export {
    postProduct
}
