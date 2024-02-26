import { useState, useEffect } from 'react'
import axios from 'axios'

const Header = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const Person = (props) => {
  return (
    <p key={props.person.id}>{props.person.name} {props.person.number}</p>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person =>
          <Person key={person.id} person={person} />
      )}
    </div>
  )
}

const Input = (props) => {
  return (
    <div>
      {props.text}: <input value={props.value} onChange={props.onChange}/>
    </div>  
  )
}

const Button = (props) => {
  return (
    <div>
      <button type={props.type}>{props.text}</button>
    </div>  
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      {props.inputs.map(input =>
        <Input key={input.id} text={input.text} value={input.value} onChange={input.onChange} />
      )}
      <Button text='add' type='submit' />
    </form>
  )
}

const Filter = (props) => {
  return (
    <Input text={props.text} value={props.value} onChange={props.onChange} />
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const fetchData = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(fetchData, [])

  const checkNameExists = (name, persons) => {
    const nameList = persons.map(person => person.name)
    return nameList.includes(name)
  }

  const addEntry = (event) => {
    event.preventDefault()

    if (newName === '') {
      window.alert('No name provided! Please fill all details before submitting.')
    } else if (newNumber === '') {
      window.alert('No number provided! Please fill all details before submitting.')
    } else {
      if (checkNameExists(newName, persons)) {
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
      } else {
        const nameObject = {
          name: newName,
          number: newNumber
        }
        
        axios
          .post('http://localhost:3001/persons', nameObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')            
          })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter((person) => {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
      return person
    }
  })

  return (
    <div>
      <Header text='Phonebook' />
      <PersonForm inputs={[{id: 1, text: 'name', value: newName, onChange: handleNameChange}, {id: 2, text: 'number', value: newNumber, onChange: handleNumberChange}]} onSubmit={addEntry} />
      <Header text='Names' />
      <div>
        <Filter text='filter names with' value={filter} onChange={handleFilter} />
        <Persons persons={personsToShow} />
      </div>
    </div>
  )
}

export default App
