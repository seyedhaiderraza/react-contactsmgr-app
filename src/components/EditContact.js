import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    //  const { id, name, email } = props.location.state.contact;
    this.state = {
      id: "007",
      name: "dummyname",
      email: "dummy@gmail.com",
    };
  }

  updateContact = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All fields are mandatory");
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ name: "", email: "" });
    console.log(this.props);
  };
  render() {
    return (
      <div className="ui main">
        <h2 style={{ marginTop: "50px" }}>Update Contact</h2>
        <Link to={"/"}>
          <button
            className="ui button green right"
            style={{ display: "inline" }}
          >
            {" "}
            View Contacts List
          </button>
        </Link>
        <form onSubmit={this.updateContact} className="ui form">
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

          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
  }
}

export default EditContact;
