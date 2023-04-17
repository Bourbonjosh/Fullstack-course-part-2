import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => <p>{props.name} {props.number}</p>
const Filter = (props) => <div>filter shown with: <input value={props.value} onChange={props.onChange} /></div>
const PersonForm = (props) => {
  return(
    <form onSubmit={props.submit}>
        <div>name: <input value={props.newName} onChange={props.nameChange} /></div>
        <div>number: <input value={props.newNumber} onChange={props.numberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)}

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
      <Filter value={filterName} onChange={handleFilterNameChange} />      
      <h2>add a new</h2>
      <PersonForm submit={addPerson} newName={newName} nameChange={handleNameChange} newNumber={newNumber} numberChange={handleNumberChange} />      
      <h2>Numbers</h2>
      <div>
          {filteredPersons.map(p =>
            <Person key={p.id} name={p.name} number={p.number} />
          )}
      </div>
      
    </div>
  )
}

export default App
