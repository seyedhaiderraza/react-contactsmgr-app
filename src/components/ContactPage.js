import React, { useContext, useEffect } from "react";
import user from "../images/contact-icon.png";
import { contactsContext } from "../context/ContactsContext";
import { Link, useLocation } from "react-router-dom";
const ContactPage = () => {
  const location = useLocation();

  return (
    <div className="main" style={{ marginTop: "10rem" }}>
      <h2 style={{ textAlign: "center" }}>Single Contact Card</h2>
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user image" />
        </div>
        <div className="content">
          <div className="header">{location.state.contact.name}</div>
          <div className="description">{location.state.contact.email}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
