import React, { useContext } from "react";
import { contactsContext } from "../context/ContactsContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { userName, authenticationToken, logoutHandler } =
    useContext(contactsContext);
  const handleLogout = () => {
    logoutHandler();
  };
  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <Link to={"/"}>
          <h2>Contacts Manager </h2>
        </Link>
        {authenticationToken ? (
          <div style={{ display: "flex", justifyItems: "flex-end" }}>
            <p>Welcome, {userName}</p>
            <button className="ui button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
