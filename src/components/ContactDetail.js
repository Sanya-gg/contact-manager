import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import download from '../images/download.png';

const ContactDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const contact = location.state?.contact;

  if (!contact) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>No contact data available</div>;
  }

  const { name, email, phone, image } = contact; // ✅ Extract phone

  return (
    <div className="main">
      <div className="ui card centered" style={{ width: '250px', marginTop: '70px' }}>
        <div 
          className="image"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '180px',
            padding: '10px'
          }}
        >
          <img 
            src={image || download}
            alt="user"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '50%'
            }}
          />
        </div>
        <div className="content" style={{ textAlign: 'center' }}>
          <div className="header">{name}</div>
          <div className="description">{email}</div>
          <div className="description">{phone}</div> {/* ✅ Display phone */}
        </div>
      </div>
      
      <div className="center-div" style={{ textAlign: 'center' }}>
        <button className="ui button blue" onClick={() => navigate('/')}>
          Back To Contact List
        </button>
      </div>
    </div>
  );
};

export default ContactDetail;
