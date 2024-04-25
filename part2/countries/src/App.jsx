import { useEffect } from 'react'
import { useState } from 'react'
import countryService from './services/countries'

const CountryList = (props) => {
  return (
    <div>
      {props.list.map((country) => 
        <p key={country}>
          {country} <button onClick={() => props.onClick(country)}>show</button>
        </p>)}
      <CountryInfo data={props.data} />
    </div> 
  )
}

const CountryInfo = (props) => {
  if (Object.keys(props.data).length !== 0) {
    return (
      <div>
        <h1>{props.data.name.common}</h1>
        <p>capital {props.data.capital}</p>
        <p>area {props.data.area}</p>
        <p>languages:</p>
        <ul>
          {Object.values(props.data.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={props.data.flags.png} alt={props.data.flags.alt} />
      </div>
    )
  } 
  return null
}

const Display = (props) => {
  if (props.list.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {
    if (props.list.length == 1) {
      return (
        <CountryInfo data={props.data} />
      )
    } else {
      return (
        <CountryList list={props.list} onClick={props.handler} data={props.data} />
      )
    }
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState(null)
  const [countryData, setCountryData] = useState({})
  const [show, setShow] = useState(null)

  const getCountriesList = () => {
    countryService
    .getAllCountryNamesList()
    .then(countries => setCountries(countries))
    .catch((error) => {
      console.log('Could not fetch list of all countries...')
      console.log(error)
    })
  }

  useEffect(getCountriesList, [])

  const getCountryData = () => {
    console.log(`fetching ${country} information`)
    if (country) {
      countryService
      .getCountryData(country)
      .then(countryData => setCountryData(countryData))
      .catch((error) => {
        console.log('Could not fetch country data...')
        console.log(error)
      })
    }
  }

  useEffect(getCountryData, [country])

  const getShowData = () => {
    console.log(`fetching ${show} information`)
    if (show) {
      countryService
      .getCountryData(show)
      .then(showData => setCountryData(showData))
      .catch((error) => {
        console.log('Could not fetch country data...')
        console.log(error)
      })
    }
  }

  useEffect(getShowData, [show])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

    const countryFilter = countries.filter((countryName) => {
      if (countryName.toLowerCase().includes(event.target.value.toLowerCase())) {
        return countryName
      }
    })
  
    const filteredListLength = countryFilter.length

    if (filteredListLength == 1) {
      if (!country) {
        setCountry(countryFilter[0])
      }
    } else {
      setCountry(null)
      setCountryData({})
    }
  }

  const countryFilter = countries.filter((countryName) => {
    if (countryName.toLowerCase().includes(filter.toLowerCase())) {
      return countryName
    }
  })

  const onClickShow = (country) => {
    setShow(country)
  }

  return (
    <div>
      find countries: <input value={filter} onChange={handleFilterChange} />
      <Display data={countryData} list={countryFilter} handler={onClickShow}/>
    </div>
  )
}

export default App
