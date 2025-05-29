import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './App.css';

import Header from './header';
import AddContact from './addcontact';
import ContactList from './contactlist';
import ContactDetail from './ContactDetail';
import DeleteContact from './DeleteContact';
import EditContact from './EditContact';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    const trimmedTerm = searchTerm.trim().toLowerCase();

    if (trimmedTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(trimmedTerm) ||
          contact.email.toLowerCase().includes(trimmedTerm) ||
          contact.phone.toLowerCase().includes(trimmedTerm) // 🔍 Now supports phone search too
        );
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const updateContactHandler = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchHandler={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandeler={addContactHandler} />}
          />
          <Route path="/contact/:id" element={<ContactDetail />} />
          <Route
            path="/delete/:id"
            element={<DeleteContact deleteContactHandler={removeContactHandler} />}
          />
          <Route
            path="/edit/:id"
            element={<EditContact updateContactHandler={updateContactHandler} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
