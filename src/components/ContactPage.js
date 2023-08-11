import React from "react";
import user from "../images/contact-icon.png";
const ContactPage = (props) => {
  console.log(props);
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user image" />
        </div>
        <div className="content">
          <div className="header">{"gg"}</div>
          <div className="description">{"Gg"}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
