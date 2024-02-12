import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , id: 1}
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // const clearRecords = () => {
  //   setPersons([])
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Names</h2>
      <div>
        {persons.map(person =>
          <p key={person.id}>{person.name}</p>
        )}
      </div>
      {/* <div>
        <button type="submit" onClick={clearRecords}>clear</button>
      </div> */}
    </div>
  )
}

export default App
