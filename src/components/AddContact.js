import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };
  addContact = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All fields are mandatory");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
    console.log(this.props);
  };
  render() {
    return (
      <div className="ui main" style={{ marginTop: "40px" }}>
        <h2>Add Contact</h2>
        <Link to={"/"}>
          <button className="ui button green right"> View Contacts List</button>
        </Link>
        <form onSubmit={this.addContact} className="ui form">
          <div className="field">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
