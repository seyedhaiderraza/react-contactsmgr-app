import { createContext, useState } from "react";
import api from "../api/ContactsAPI";
import { v4 as uuidv4 } from "uuid";
const contactsContext = createContext();

const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts((prev) => [...prev, response.data]);
  };

  const fetchContacts = async () => {
    const response = await api.get("/contacts");
    console.log(response);
    if (response.data) setContacts(response.data);
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

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const updatedContactsList = contacts.filter(
      (item) => item.id !== contact.id
    );
    setContacts((prev) => [...updatedContactsList, response.data]);
  };
  const contextStateData = {
    contacts,
    addContactHandler,
    fetchContacts,
    updateContactHandler,
    removeContactHandler,
  };
  return (
    <contactsContext.Provider value={contextStateData}>
      {children}
    </contactsContext.Provider>
  );
};

export { ContactsContextProvider, contactsContext };
