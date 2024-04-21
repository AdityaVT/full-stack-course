import { useState, useEffect } from 'react'
import personService from './services/persons'

const Header = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const Person = (props) => {
  return (
    <div>
      <p>{props.person.name} {props.person.number} <button onClick={props.deleteRecord}>delete</button></p>
    </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person =>
          <Person key={person.id} person={person} deleteRecord={() => props.deleteHandler(person.id)} />
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

const Alert = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.type}>
      {props.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertMessageType, setAlertMessageType] = useState(null)

  const fetchData = () => {
    personService
      .getAll()
      .then(initialRecords => {
        setPersons(initialRecords)
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
        if (window.confirm(`'${newName}' is already added to the phonebook, replace the old number with the new number?`)) {
          const personRecord = persons.find(person => person.name === newName)
          const changedRecord = { ...personRecord, name: newName, number: newNumber }

          personService
            .update(changedRecord.id, changedRecord)
            .then(returnedRecord => {
              setPersons(persons.map(person => person.id !== changedRecord.id ? person : returnedRecord))
              setNewName('')
              setNewNumber('')
              setAlertMessageType('success')
              setAlertMessage(`Updated phonebook entry for '${returnedRecord.name}'`)
              setTimeout(() => {
                setAlertMessage(null)
              }, 5000)
            })
            .catch(error => {
              console.log(error)
              setAlertMessageType('error')
              setAlertMessage(`Phone record entry for '${changedRecord.name}' has already been removed from server`)
              setTimeout(() => {
                setAlertMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== changedRecord.id))
              setNewName('')
              setNewNumber('')
            })
        } else {
          setNewName('')
          setNewNumber('')
        }
      } else {
        const nameObject = {
          name: newName,
          number: newNumber
        }
        
        personService
          .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setAlertMessageType('success')
            setAlertMessage(`Created new phonebook entry for '${returnedPerson.name}'`)
            setTimeout(() => {
              setAlertMessage(null)
            }, 5000)      
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

  const deleteRecordOf = (personId) => {
    const person = persons.find(person => person.id === personId)

    if (window.confirm(`Delete ${person.name}?`)) {
      console.log(`Deleting person with id ${personId}`)
      personService
        .deleteRecord(personId)
        .then(response => {
          console.log(`Deleted person with id ${personId}`)
          setPersons(persons.filter(person => person.id !== personId))
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      console.log(`Delete request cancelled`)
    }
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Alert message={alertMessage} type={alertMessageType} />
      <PersonForm inputs={[{id: 1, text: 'name', value: newName, onChange: handleNameChange}, {id: 2, text: 'number', value: newNumber, onChange: handleNumberChange}]} onSubmit={addEntry} />
      <Header text='Names' />
      <div>
        <Filter text='filter names with' value={filter} onChange={handleFilter} />
        <Persons persons={personsToShow} deleteHandler={deleteRecordOf} />
      </div>
    </div>
  )
}

export default App
