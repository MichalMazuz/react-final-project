import axios from 'axios'

const baseUrl = "http://localhost:4000/product"

export const fetchProducts = async () => {
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data
}

export const postProduct = async (dataProduct) => {
    const response = await axios.post(baseUrl, dataProduct)
    return response.data
}

export const putProductA = async (id, newProduct) => {
    const getResponse = await axios.put(`${baseUrl}/${id}`, newProduct)
    return getResponse.data
}

export const fetchProductByIdApi = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}
