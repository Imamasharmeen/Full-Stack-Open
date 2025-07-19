import { useState, useEffect } from 'react';
import Filter from './components/Filter.jsx';
import PersonForm from './components/PersonForm.jsx';
import Persons from './components/Persons.jsx';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  // Fetch initial data from the backend
  useEffect(() => {
    axios.get('http://localhost:3002/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const addName = (event) => {
    event.preventDefault();
    const exists = persons.some(person => person.name === newName);
    if (exists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    axios.post('http://localhost:3002/persons', newPerson)
      .then(response => {
        setPersons([...persons, response.data]); 
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error adding person:', error);
      });
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addName}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
