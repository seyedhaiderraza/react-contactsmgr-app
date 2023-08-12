import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactPage from "./components/ContactPage";
import EditContact from "./components/EditContact";
import api from "./api/ContactsAPI";
import { ContactsContextProvider } from "./context/ContactsContext";

function App() {
  const LocalStorage_KEY = "contacts";
  //const [contacts, setContacts] = useState([]); //if initial state [] not given undefined render error

  //useEffect(() => {
  // const fetchedContacts = JSON.parse(localStorage.getItem(LocalStorage_KEY)); //str to obj
  // if (fetchedContacts) setContacts(fetchedContacts);
  /* const getAllContacts = async () => {
      const allContacts = await fetchContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);
*/
  //without if contacts empty check localstorage empty on page refresh
  //explaination:
  //stackoverflow.com/questions/67141669/why-my-localstorage-gets-empty-each-time-i-reload-the-page
  //useEffect(() => {
  // if (contacts.length !== 0)
  //   localStorage.setItem(LocalStorage_KEY, JSON.stringify(contacts));
  // else localStorage.clear();
  // //obj to str
  // }, [contacts]);
  //whenever contacts array changes rrender happens to update the contacts list display

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <ContactsContextProvider>
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/add" element={<AddContact />} />

            <Route path="/contact/:id" element={<EditContact />} />
            <Route path="/contact/view/:id" element={<ContactPage />} />
          </Routes>
        </ContactsContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
