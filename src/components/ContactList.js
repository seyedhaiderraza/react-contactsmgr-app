import React, { useRef, useEffect, useContext } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import { contactsContext } from "../context/ContactsContext";

const ContactList = (props) => {
  const { contacts, fetchContacts } = useContext(contactsContext);
  const searchKeyword = useRef("");

  const removeContactHandler = (id) => {
    props.removeContactHandler(id);
  };

  const searchKeywordHandler = () => {
    props.searchKeywordHandler(searchKeyword.current.value);
  };

  useEffect(() => {
    fetchContacts(); //without calling this contacts wont be populated
  }, []);
  const displayContactList = contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={removeContactHandler}
      />
    );
  });

  return (
    <div className="ui main">
      <h2 style={{ marginTop: "40px" }}>Contacts List</h2>
      <div className="ui search">
        <div
          className="ui icon input"
          style={{ margin: "0px 0px 20px 10px", width: "30%" }}
        >
          <input
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={searchKeywordHandler}
            ref={searchKeyword}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <Link to={"/add"}>
        <button className="ui button blue right"> Add Contact</button>
      </Link>
      <div className="ui celled list">
        {displayContactList.length > 0
          ? displayContactList
          : "No Contacts Available"}
      </div>
      ;
    </div>
  );
};

export default ContactList;
