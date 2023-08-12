import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { contactsContext } from "../context/ContactsContext";

const AddContact = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const { addContactHandler } = useContext(contactsContext);

  const addContact = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All fields are mandatory");
      return;
    }
    addContactHandler({ name, email });
    setName("");
    setEmail("");
    navigate("/");
  };
  return (
    <div className="ui main" style={{ marginTop: "40px" }}>
      <h2>Add Contact</h2>
      <Link to={"/"}>
        <button className="ui button green right"> View Contacts List</button>
      </Link>
      <form onSubmit={addContact} className="ui form">
        <div className="field">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
