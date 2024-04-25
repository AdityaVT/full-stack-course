import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountryNamesList = () => {
    return axios
    .get(`${baseUrl}/all`)
    .then(response => response.data)
    .then(responseData => responseData.map(countryData => countryData.name.common))
}

const getCountryData = (country) => {
    return axios
    .get(`${baseUrl}/name/${country}`)
    .then(response => response.data)
}

export default { getAllCountryNamesList, getCountryData }