import axios from 'axios'

const baseUrl = "http://localhost:4000/order"

export const fetchOrders = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const fetchOrderByIdApi = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const postOrder = async (dataOrder) => {
    const response = await axios.post(baseUrl, dataOrder)
    return response.data
}