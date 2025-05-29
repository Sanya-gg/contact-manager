import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './contactcard';

const ContactList = (props) => {
  const inputEl = useRef("");
  const { contacts, getContactId, searchTerm, setSearchTerm, searchHandler } = props;

  // Render the contact list including the phone number
  const renderContactList = contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={getContactId} // Fixed typo from clickHandeler to clickHandler
      />
    );
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    searchHandler(e.target.value); // This filters contacts by name, email, or phone number
  };

  return (
    <div className="ui main" style={{ marginTop: '70px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Contact List</h2>
        <Link to="/add">
          <button className="ui button blue">Add Contact</button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="ui search" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div className="ui icon input" style={{ width: '50%' }}>
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            style={{ width: '100%' }}
            value={searchTerm}
            onChange={handleSearch}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list" style={{ marginTop: '20px' }}>
        {renderContactList.length > 0 ? renderContactList : <p>No contacts found.</p>}
      </div>
    </div>
  );
};

export default ContactList;
