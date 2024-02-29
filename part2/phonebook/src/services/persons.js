import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const getRecord = (personId) => {
    return axios.get(`${baseUrl}/${personId}`).then(response => response.data)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const deleteRecord = (personId) => {
    return axios.delete(`${baseUrl}/${personId}`)
}

export default { getAll, getRecord, create, deleteRecord }