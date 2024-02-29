import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const deleteRecord = (personId) => {
    return axios.delete(`${baseUrl}/${personId}`)
}

const update = (personId, updateObject) => {
    return axios.put(`${baseUrl}/${personId}`, updateObject).then(response => response.data)
}

export default { getAll, create, deleteRecord, update }