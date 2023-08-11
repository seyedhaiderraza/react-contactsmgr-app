import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const LocalStorage_KEY = "contacts";
  const [contacts, setContacts] = useState([]); //if initial state [] not given undefined render error

  const addContactHandler = (contact) => {
    setContacts((prev) => [...prev, { id: uuidv4(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    setContacts((prev) => {
      return prev.filter((contact) => contact.id !== id);
    });
  };
  useEffect(() => {
    const fetchedContacts = JSON.parse(localStorage.getItem(LocalStorage_KEY)); //str to obj
    if (fetchedContacts) setContacts(fetchedContacts);
  }, []);

  //without if contacts empty check localstorage empty on page refresh
  //explaination:
  //stackoverflow.com/questions/67141669/why-my-localstorage-gets-empty-each-time-i-reload-the-page
  useEffect(() => {
    if (contacts.length !== 0)
      localStorage.setItem(LocalStorage_KEY, JSON.stringify(contacts));
    else localStorage.clear();
    //obj to str
  }, [contacts]);
  //whenever contacts array changes rrender happens to update the contacts list display

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />

          <Route
            path="/"
            element={
              <ContactList
                contacts={contacts}
                removeContactHandler={removeContactHandler}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
