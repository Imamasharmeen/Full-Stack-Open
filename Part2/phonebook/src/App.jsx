import { useState, useEffect } from 'react';
import Filter from './components/Filter.jsx';
import PersonForm from './components/PersonForm.jsx';
import Persons from './components/Persons.jsx';
import apiService from './service/api.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  // Fetch initial data from the backend
  useEffect(() => {
    apiService.getAll()
      // axios.get('http://localhost:3002/persons')
      .then(initialPersons => {
        setPersons(initialPersons);
        
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

    apiService.create(newPerson)
      .then(returnedPerson  => {
        setPersons([...persons, returnedPerson ]); 
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error adding person:', error);
      });
  };

    const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      apiService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          alert(`Information of ${name} has already been removed from server`);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  const filteredPersons = persons?.filter(person =>
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
      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;
