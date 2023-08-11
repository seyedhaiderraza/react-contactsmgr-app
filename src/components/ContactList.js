import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
const ContactList = (props) => {
  const removeContactHandler = (id) => {
    props.removeContactHandler(id);
  };
  const displayContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={removeContactHandler}
      />
    );
  });
  return (
    <div className="ui main" style={{ marginTop: "40px" }}>
      <h2>Contacts List</h2>
      <Link to={"/add"}>
        <button className="ui button blue right"> Add Contact</button>
      </Link>
      <div className="ui celled list">{displayContactList}</div>;
    </div>
  );
};

export default ContactList;
