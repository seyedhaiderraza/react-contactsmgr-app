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
    <div
      className="ui fixed menu"
      style={{ paddingTop: "20px", paddingBottom: "20px" }}
    >
      <div className="ui container center">
        <Link to={"/"}>
          <h2>Contacts Manager </h2>
        </Link>
        {authenticationToken ? (
          <div style={{ display: "flex", justifyItems: "flex-end" }}>
            <h3 style={{ margin: "0rem 10rem" }}>
              Welcome User,{" "}
              <span
                style={{
                  color: "white",
                  background: "gray",
                  padding: "0.5rem",
                }}
              >
                {userName}
              </span>
            </h3>
            <button className="ui button teal" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
