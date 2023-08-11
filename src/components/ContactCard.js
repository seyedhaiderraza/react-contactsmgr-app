import React from "react";
import user from "../images/contact-icon.png";

const ContactCard = ({ contact, clickHandler }) => {
  const { id, name, email } = contact;
  return (
    <div className="item" style={{ display: "flex", alignItems: "center" }}>
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <div className="header">{name}</div>
        <div>{email}</div>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", margin: "1rem", cursor: "pointer" }}
      ></i>
    </div>
  );
};

export default ContactCard;
