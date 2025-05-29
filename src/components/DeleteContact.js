import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const DeleteContact = ({ deleteContactHandler }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { contact } = location.state || {}; // fallback in case someone comes directly

  const handleDelete = () => {
    deleteContactHandler(id);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="ui main" style={{ marginTop: '70px', textAlign: 'center' }}>
      <h2>Are you sure you want to delete this contact?</h2>
      {contact && (
        <p>
          <strong>{contact.name}</strong><br />
          {contact.email}<br />
          {contact.phone}
        </p>
      )}
      <div style={{ marginTop: '20px' }}>
        <button className="ui red button" onClick={handleDelete}>
          Yes, Delete
        </button>
        <button className="ui button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          No, Go Back
        </button>
      </div>
    </div>
  );
};

export default DeleteContact;
