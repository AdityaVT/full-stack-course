import { useState } from 'react'

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

  // const clearRecords = () => {
  //   setPersons([])
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName} {newNumber}</div>
      <h2>Names</h2>
      <div>
        <div>
          filter names with: <input value={filter} onChange={handleFilter} />
        </div>
        {personsToShow.map(person =>
          <p key={person.id}>{person.name} {person.number}</p>
        )}
      </div>
      {/* <div>
        <button type="submit" onClick={clearRecords}>clear</button>
      </div> */}
    </div>
  )
}

export default App
