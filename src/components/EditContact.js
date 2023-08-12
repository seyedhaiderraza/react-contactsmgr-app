import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { contactsContext } from "../context/ContactsContext";

const EditContact = () => {
  // constructor(props) {
  //   super(props);
  //   console.log(props);
  //   //  const { id, name, email } = props.location.state.contact;
  //   this.state = {
  //     id: "007",
  //     name: "dummyname",
  //     email: "dummy@gmail.com",
  //   };
  // }
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name, email } = location.state.contact;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const { updateContactHandler } = useContext(contactsContext);
  const updateContact = (e) => {
    e.preventDefault();
    if (newName === "" || newEmail === "") {
      alert("All fields are mandatory");
      return;
    }
    updateContactHandler({ id, name: newName, email: newEmail });
    //  updateContactHandler({ id, newName,newEmail }); this was not working giving axios 404 error why?
    setNewEmail("");
    setNewName("");
    navigate("/");
  };
  return (
    <div className="ui main">
      <h2 style={{ marginTop: "50px" }}>Update Contact</h2>
      <Link to={"/"}>
        <button className="ui button green right" style={{ display: "inline" }}>
          {" "}
          View Contacts List
        </button>
      </Link>
      <form onSubmit={updateContact} className="ui form">
        <div className="field">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
