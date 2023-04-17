import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  
  const hook = () => {
    console.log('pass useEffect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfilled');
        setPersons(response.data);
      })
  }

  useEffect(hook, []);


  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()));

  const addPerson = (event) => {
    event.preventDefault();
    const isNameUnique = persons.every(p => p.name !== newName);
    if (!isNameUnique) {
      alert(`${newName} is already added to phonebook`);
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleFilterNameChange =(event) => {
    setFilterName(event.target.value);
  }

  const handleNameChange =(event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange =(event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value={filterName} onChange={handleFilterNameChange} /></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {filteredPersons.map(p =>
            <li key={p.id}>{p.name} {p.number}</li>
          )}
        </ul>
      </div>
      
    </div>
  )
}

export default App
