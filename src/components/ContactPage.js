import React, { useContext, useEffect } from "react";
import user from "../images/contact-icon.png";
import { contactsContext } from "../context/ContactsContext";
import { Link, useLocation } from "react-router-dom";
const ContactPage = () => {
  const location = useLocation();
  const _id = location.state.contact._id;
  return (
    <div className="main" style={{ marginTop: "2.5rem" }}>
      <h2 style={{ textAlign: "center" }}>Single Contact Card</h2>
      <div className="ui card centered">
        <div className="image">
          <img src={location.state.dp} alt="user image" />
        </div>
        <div className="content">
          <div className="header">{location.state.contact.name}</div>
          <div className="description">{location.state.contact.email}</div>
        </div>
        <Link
          to={`/contact/${location.state.contact._id}`}
          state={{ contact: location.state.contact }}
          className="ui button teal"
        >
          Update Contact
        </Link>
      </div>
      <Link
        to={`/`}
        className="ui button green"
        style={{ margin: "0rem 20% 0rem 30%" }}
      >
        Contacts List
      </Link>
    </div>
  );
};

export default ContactPage;
