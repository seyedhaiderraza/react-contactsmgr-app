import React, { useContext } from "react";
import user from "../images/contact-icon.png";
import { Link } from "react-router-dom";
import { contactsContext } from "../context/ContactsContext";

const ContactCard = ({ contact, clickHandler }) => {
  const { removeContactHandler } = useContext(contactsContext);

  const { _id, name, email } = contact;
  const removeContact = (id) => {
    removeContactHandler(id);
  };
  return (
    <div className="item" style={{ display: "flex", alignItems: "center" }}>
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={`/contact/view/${_id}`} state={{ contact: contact }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <Link to={`/contact/${_id}`} state={{ contact: contact }}>
        <i
          className="edit alternate outline icon"
          style={{
            color: "green",
            margin: "1rem",
            cursor: "pointer",
            marginLeft: "2rem",
          }}
        ></i>
      </Link>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", margin: "1rem", cursor: "pointer" }}
        onClick={() => removeContact(_id)}
      ></i>
    </div>
  );
};

export default ContactCard;
