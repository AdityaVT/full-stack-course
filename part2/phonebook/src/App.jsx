import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
          id: persons.length + 1,
          number: newNumber
        }
    
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
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