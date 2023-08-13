import React, { useRef, useEffect, useContext } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import { contactsContext } from "../context/ContactsContext";

const ContactList = (props) => {
  const {
    errorMessage,
    contacts,
    fetchContacts,
    searchResults,
    searchTerm,
    searchKeywordHandler,
  } = useContext(contactsContext);
  const searchKeyword = useRef("");

  const searchKeywordHandle = () => {
    searchKeywordHandler(searchKeyword.current.value);
  };
  useEffect(() => {
    fetchContacts();
    //without calling this contacts wont be populated
  }, []);
  const filteredContacts = searchTerm ? searchResults : contacts;
  //if we dont use searchTerm for filtering 'no contacts available wont be shown
  const displayContactList = filteredContacts.map((contact) => {
    const rndmPic =
      `https://i.pravatar.cc/150?img=` +
      (Math.floor(Math.random() * (70 - 1 + 1)) + 1);
    return (
      <ContactCard key={contact._id} contact={contact} rndmPic={rndmPic} />
    );
  });

  return (
    <div className="ui main" style={{ marginTop: "2.5rem" }}>
      <h1 style={{ textAlign: "center" }}>Contacts List</h1>
      <div className="ui search">
        <div
          className="ui icon input"
          style={{ margin: "0px 0px 20px 0px", width: "100%" }}
        >
          <input
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={searchTerm}
            onChange={searchKeywordHandle}
            ref={searchKeyword}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <Link to={"/add"}>
        <button className="ui button blue" style={{ margin: "0rem 30%" }}>
          Add New Contact
        </button>
      </Link>
      <div className="ui celled list">
        {displayContactList.length > 0
          ? displayContactList
          : errorMessage
          ? errorMessage
          : "No Contacts Available"}
      </div>
    </div>
  );
};

export default ContactList;
