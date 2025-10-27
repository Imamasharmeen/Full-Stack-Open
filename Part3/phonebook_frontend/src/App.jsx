import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    personService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = id => {
    if (window.confirm('Delete this person?')) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={e => setNewName(e.target.value)} /></div>
        <div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} /></div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
