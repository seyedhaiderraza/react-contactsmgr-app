import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ContactPage from "./components/ContactPage";
import EditContact from "./components/EditContact";
import api from "./api/ContactsAPI";
import { ContactsContextProvider } from "./context/ContactsContext";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const PrivateRoute = ({ element, ...props }) => {
    const authToken = localStorage.getItem("authToken");
    return authToken ? <>{element}</> : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ContactsContextProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={<PrivateRoute path="/" element={<ContactList />} />}
            />
            <Route
              path="/add"
              element={<PrivateRoute path="/" element={<AddContact />} />}
            />
            <Route
              path="/contact/:id"
              element={<PrivateRoute path="/" element={<EditContact />} />}
            />
            <Route
              path="/contact/view/:id"
              element={<PrivateRoute path="/" element={<ContactPage />} />}
            />
          </Routes>
        </ContactsContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
