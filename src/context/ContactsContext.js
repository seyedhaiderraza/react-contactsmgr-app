import { createContext, useState } from "react";
import api from "../api/ContactsAPI";

const contactsContext = createContext();

const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const response = await api.get("/contacts");
    console.log(response);
    if (response.data) setContacts(response.data);
  };

  const contactsData = {
    contacts,
    fetchContacts,
  };
  return (
    <contactsContext.Provider value={contactsData}>
      {children}
    </contactsContext.Provider>
  );
};

export { ContactsContextProvider, contactsContext };
