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
import { all } from "axios";
function App() {
  const LocalStorage_KEY = "contacts";
  const [contacts, setContacts] = useState([]); //if initial state [] not given undefined render error
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts((prev) => [...prev, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`contacts/${contact.id}`, contact);
    const updatedContactsList = contacts.filter(
      (item) => item.id !== contact.id
    );
    setContacts((prev) => [...updatedContactsList, response.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    setContacts((prev) => {
      return prev.filter((contact) => contact.id !== id);
    });
    /*this setstate to make sure the contact is removed
     and not visible to click delete button again
     else it will trigger removeContactHandler=>
     api.delete=> contact not found in json server=>404
     */
  };

  const fetchContacts = async () => {
    const response = await api.get("/contacts");
    console.log(response);
    return response.data;
  };

  const searchKeywordHandler = (searchKeyword) => {
    setSearchTerm(searchKeyword);

    if (searchKeyword !== "") {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(contacts);
    }
  };
  useEffect(() => {
    // const fetchedContacts = JSON.parse(localStorage.getItem(LocalStorage_KEY)); //str to obj
    // if (fetchedContacts) setContacts(fetchedContacts);
    const getAllContacts = async () => {
      const allContacts = await fetchContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  //without if contacts empty check localstorage empty on page refresh
  //explaination:
  //stackoverflow.com/questions/67141669/why-my-localstorage-gets-empty-each-time-i-reload-the-page
  useEffect(() => {
    // if (contacts.length !== 0)
    //   localStorage.setItem(LocalStorage_KEY, JSON.stringify(contacts));
    // else localStorage.clear();
    // //obj to str
  }, [contacts]);
  //whenever contacts array changes rrender happens to update the contacts list display

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                removeContactHandler={removeContactHandler}
                searchTerm={searchTerm}
                searchKeywordHandler={searchKeywordHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />

          <Route
            path="/edit"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
          />
          <Route path="/contact/:id" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
