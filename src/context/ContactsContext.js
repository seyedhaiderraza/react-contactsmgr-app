import { createContext, useEffect, useState } from "react";
import api from "../api/ContactsAPI";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const contactsContext = createContext();

const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [authenticationToken, setAuthenticationToken] = useState(
    localStorage.getItem("authToken")
  ); // Add this state to store the authentication token
  const [errorMessage, setError] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isRegistered, setisRegistered] = useState(false);
  const loginHandler = async (email, password) => {
    try {
      const response = await axios.post(
        "https://contacts-manager-app-node-express.vercel.app/api/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.authentication_token;
      localStorage.setItem("authToken", token); // Save token to Context
      await setAuthenticationToken(localStorage.getItem("authToken"));
      localStorage.setItem("userName", email);
      setUserName(localStorage.getItem("userName"));
      navigate("/"); // Redirect to the contacts list page
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const logoutHandler = () => {
    localStorage.setItem("authToken", "");
    setAuthenticationToken("");
    localStorage.setItem("userName", "");
    setUserName(localStorage.getItem("userName"));
    setContacts([]); // Clear contacts on logout
    setisRegistered(false);
    navigate("/login");
  };
  const registerHandler = async ({ username, email, password }) => {
    try {
      const response = await axios.post(
        "https://contacts-manager-app-node-express.vercel.app/api/users/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.email) {
        setisRegistered(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  useEffect(() => {
    // Retrieve authentication token from localStorage if available
    const storedToken = localStorage.getItem("authToken");
    const username = localStorage.getItem("userName");

    if (storedToken) {
      setAuthenticationToken(storedToken);

      // fetchContacts();
    }
    if (username) {
      setUserName(username);
    }
  }, []);
  const addContactHandler = async (contact) => {
    const request = {
      ...contact,
      phone: "333333",
    };

    const response = await api.post("/contacts", request, {
      headers: {
        Authorization: `Bearer ${authenticationToken}`,
      },
    });
    setContacts((prev) => [...prev, response.data]);
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get("/contacts", {
        headers: {
          Authorization: `Bearer ${authenticationToken}`,
        },
      });
      if (response.data) setContacts(response.data);
    } catch (error) {
      if (error?.response?.data)
        setError(
          `Error for user ${userName}: ${error?.response?.data.message}`
        );
    }
  };

  const removeContactHandler = async (id) => {
    const response = await api.delete(`/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${authenticationToken}`,
      },
    });
    if (response?.data?.message === "contact removed") {
      setContacts((prev) => {
        return prev.filter((contact) => contact._id !== id);
      });
    }
    /*this setstate to make sure the contact is removed
     and not visible to click delete button again
     else it will trigger removeContactHandler=>
     api.delete=> contact not found in json server=>404
     */
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact._id}`, contact, {
      headers: {
        Authorization: `Bearer ${authenticationToken}`,
      },
    });
    console.log(`updateContactHandler called`, response);
    const updatedContactsList = contacts.filter(
      (item) => item.id !== contact.id
    );
    setContacts((prev) => [...updatedContactsList, response.data]);
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

  const contextStateData = {
    userName,
    errorMessage,
    contacts,
    searchResults,
    searchTerm,
    authenticationToken,
    isRegistered,
    setisRegistered,
    registerHandler,
    logoutHandler,
    loginHandler,
    addContactHandler,
    fetchContacts,
    updateContactHandler,
    removeContactHandler,
    searchKeywordHandler,
  };
  return (
    <contactsContext.Provider value={contextStateData}>
      {children}
    </contactsContext.Provider>
  );
};

export { ContactsContextProvider, contactsContext };
