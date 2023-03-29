import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 },
    { name: 'Ada Lovelace', id: 2 },
    { name: 'Dan Abramov', id: 3 },
    { name: 'Mary Poppendieck', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(nameObject));
    setNewName('');
  }

  const handleNameChange =(event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(p =>
            <li key={p.id}>{p.name}</li>
          )}
        </ul>
      </div>
      
    </div>
  )
}

export default App
