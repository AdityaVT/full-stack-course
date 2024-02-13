import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , id: 1, number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
        {persons.map(person =>
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
