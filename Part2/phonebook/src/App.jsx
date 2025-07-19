import { useState, useEffect } from 'react';
import Filter from './components/Filter.jsx';
import PersonForm from './components/PersonForm.jsx';
import Persons from './components/Persons.jsx';
import apiService from './service/api.js';
import Notification from './components/Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  // ✅ Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 4000);
  };

  // ✅ Load all persons on mount
  useEffect(() => {
    apiService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        showNotification('Failed to fetch contacts', 'error');
        console.error(error);
      });
  }, []);

  // ✅ Input Handlers
  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);
  const handleSearchChange = e => setSearch(e.target.value);

  // ✅ Add or update person
  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added. Replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        apiService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => 
              p.id !== existingPerson.id ? p : returnedPerson
            ));
            showNotification(`Updated ${returnedPerson.name}`);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            // ✅ Handle 404 (not found on server)
            showNotification(
              `Information for ${newName} has already been removed from the server`,
              'error'
            );
            setPersons(persons.filter(p => p.id !== existingPerson.id));
          });
      }

    } else {
      // ✅ Create new person
      apiService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson]);
          showNotification(`Added ${returnedPerson.name}`);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          showNotification('Failed to add person', 'error');
          console.error(error);
        });
    }
  };

  // ✅ Delete person
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      apiService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          showNotification(`Deleted ${name}`);
        })
        .catch(error => {
          showNotification(`Information of ${name} already removed`, 'error');
          setPersons(persons.filter(p => p.id !== id));
          console.error(error);
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>PhoneBook</h2>

      <Notification message={notification.message} type={notification.type} />

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
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
