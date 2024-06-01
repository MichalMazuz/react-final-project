import axios from 'axios'

const baseUrl = "http://localhost:4000/user"

export const fetchUsers = async () => {
    const response = await axios.get(baseUrl)

    return response.data
}

export const loginA = async (dataUser) => {
    const response = await axios.post(`${baseUrl}/login`, dataUser)
    debugger
    console.log(response.data)
    if (response.status == 401) {
        console.log("i cant find you")
        return null
    }
    return response.data
}

export const postUser = async (dataUser) => {
    debugger
    const response = await axios.post(baseUrl, dataUser)
    console.log(response.data)
    return response.data
}