import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const saveEntry = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, you little cheeky guy, you! Do you want to replace the old number with a new one?`
        )
      ) {
        const targetPerson = persons.find((person) => person.name === newName);
        personService
          .update(targetPerson.id, { ...targetPerson, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setSuccessMessage(
              `Number of ${returnedPerson.name} successfully updated`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setSuccessMessage(
              `Sorry, dude, ${targetPerson.name} was already deleted.`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== targetPerson.id)
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setSuccessMessage(
            `${returnedPerson.name} successfully added to your phonebook, you popular guy, you!`
          );
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deletePerson = (name, id) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personService.deletePerson(id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== id));
        setSuccessMessage(`Deletion successfull, wahahaha`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
  };

  const changeFilterName = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter changeFilterName={changeFilterName} />

      <h2>Add a new</h2>
      <PersonForm
        saveEntry={saveEntry}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {personsToShow.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person.name, person.id)}>
              delete
            </button>
          </p>
        );
      })}
    </div>
  );
}

export default App;
