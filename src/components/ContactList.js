import React from "react";
import ContactCard from "./ContactCard";

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
  return <div className="ui celled list">{displayContactList}</div>;
};

export default ContactList;
