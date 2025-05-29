import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import download from '../images/download.png'; // fallback image

const ContactCard = (props) => {
  const { id, name, email, phone, image } = props.contact; // Added phone
  const navigate = useNavigate();

  return (
    <div className="item">
      <img className="ui avatar image" src={image || download} alt="user" />
      <div className="content">
        <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
          <div className="header">{name}</div>
          <div>{email}</div>
          <div>{phone}</div> {/* Display the phone number */}
        </Link>
      </div>

      {/* Edit Button */}
      <i
        className="edit outline icon"
        style={{ color: 'blue', marginTop: '7px', float: 'right', cursor: 'pointer', marginRight: '10px' }}
        onClick={() => navigate(`/edit/${id}`, { state: { contact: props.contact } })}
      ></i>

      {/* Delete Button */}
      <i
        className="trash alternate outline icon"
        style={{ color: 'red', marginTop: '7px', float: 'right', cursor: 'pointer' }}
        onClick={() => navigate(`/delete/${id}`, { state: { contact: props.contact } })}
      ></i>
    </div>
  );
};

export default ContactCard;
