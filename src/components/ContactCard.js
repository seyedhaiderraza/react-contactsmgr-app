import React, { useContext } from "react";
import user from "../images/contact-icon.png";
import { Link } from "react-router-dom";
import { contactsContext } from "../context/ContactsContext";

const ContactCard = ({ contact, rndmPic }) => {
  const { removeContactHandler } = useContext(contactsContext);

  const { _id, name, email } = contact;
  const removeContact = (id) => {
    removeContactHandler(id);
  };
  return (
    <div className="item">
      <div
        className="content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <img className="ui avatar image" src={user} alt="user" />

        <Link
          to={`/contact/view/${_id}`}
          state={{ contact: contact, dp: rndmPic }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <div
        className="content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          marginLeft: "15rem",
        }}
      >
        <Link to={`/contact/${_id}`} state={{ contact: contact }}>
          <i
            className="edit alternate outline icon"
            style={{
              color: "green",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
          ></i>
        </Link>
        <i
          className="trash alternate outline icon"
          style={{
            color: "red",
            cursor: "pointer",
            marginLeft: "20%",
            fontSize: "1.5rem",
          }}
          onClick={() => removeContact(_id)}
        ></i>
      </div>
    </div>
  );
};

export default ContactCard;
