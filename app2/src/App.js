import { useState, useEffect } from 'react'
//import axios from 'axios'
import personsService from './services/persons'

const Person = (props) => <p>{props.name} {props.number} <button onClick={props.remPersonCB}>delete</button></p>
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

  /*useEffect(() => {
    //console.log("My useeffect");
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])*/

  useEffect(() => {
    const loadInitialPersons = async () => {
      const initialPersons = await personsService.getAll();
      setPersons(initialPersons)
    }
    loadInitialPersons();
  }, [])
  
  /*const axiosHook = () => {
    console.log('through axios hook');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('axios promise is fullfilled');
        console.log('response.data :', response.data);
        setPersons(response.data);
      })
  }

  useEffect(axiosHook, []);*/

  // And that's how you do it using fetch() instead of axios
  // -------------------------------------------------------
  
  /*const fetchHook = () => {
    console.log('through fetch hook');
    fetch('http://localhost:3001/persons')
      .then(async response => {
        console.log('fetch promise fullfilled');
        const data = await response.json();
        console.log('data :', data);
        setPersons(data);
      })
  }

  useEffect(fetchHook, []);*/


  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()));

  /*const addOrModifyPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name == newName);
    if (typeof existingPerson !== 'undefined') {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {
        const updatedPerson = {...existingPerson, number: newNumber};
        personsService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            console.log("Here is the response from put : ", returnedPerson);
            console.log("id :", returnedPerson.id);
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setNewName('');
            setNewNumber('');
          }) 
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      personsService
        .create(personObject)
        .then(returnedPerson => {
          console.log("Here is the response from post : ", returnedPerson);
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');        
        }); 
    }
  }*/

  const addOrModifyPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name == newName);
    if (typeof existingPerson !== 'undefined') {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {
        const updatedPerson = {...existingPerson, number: newNumber};
        const updatePerson = async () => {
          const returnedPerson = await personsService.update(updatedPerson.id, updatedPerson);
          console.log("Here is the response from put : ", returnedPerson);
          console.log("id :", returnedPerson.id);
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          setNewName('');
          setNewNumber('');
        }
        updatePerson();
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      const createPerson = async () => {
        const returnedPerson = await personsService.create(personObject);
        console.log("Here is the response from post : ", returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      }
      createPerson();     
    }
  }

  /*const remPerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name} ?`))
    {
      personsService
        .remove(id)
        .then(returnedResponseData => {
          console.log("Here is the response from delete : ", returnedResponseData);
          setPersons(persons.filter(p => p.id !== id));
        })
      
      
    }
  }*/
  
  const remPerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name} ?`))
    {
      const removePerson = async () => {
        const returnedResponseData = await personsService.remove(id);
        console.log("Here is the response from delete : ", returnedResponseData);
        setPersons(persons.filter(p => p.id !== id));
      }
      removePerson();      
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
      <PersonForm submit={addOrModifyPerson} newName={newName} nameChange={handleNameChange} newNumber={newNumber} numberChange={handleNumberChange} />      
      <h2>Numbers</h2>
      <div>
          {filteredPersons.map(p =>
            <Person key={p.id} name={p.name} number={p.number} remPersonCB={() => remPerson(p.id, p.name)} />
          )}
      </div>
      
    </div>
  )
}

export default App
