import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import download from '../images/download.png';

const EditContact = ({ updateContactHandler }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const contact = location.state?.contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // ✅ Added
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState(''); // Error state for validation

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone || ''); // ✅ Load existing phone
      setImage(contact.image || '');
      setPreview(contact.image || '');
    }
  }, [contact]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate phone number (must be exactly 10 digits)
  const validatePhone = (phone) => {
    return phone.length === 10 && /^[0-9]{10}$/.test(phone);
  };

  const update = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || phone === '') {
      alert('All the fields are mandatory!');
      return;
    }

    // Validate phone number
    if (!validatePhone(phone)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    setError(''); // Reset error if validation passes

    updateContactHandler({ id, name, email, phone, image }); // ✅ Send phone too
    navigate('/');
  };

  if (!contact) {
    return <div style={{ marginTop: '70px' }}>Contact not found.</div>;
  }

  return (
    <div className="ui main" style={{ marginTop: '70px' }}>
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <div className="ui red message">{error}</div>} {/* Show error message */}
        </div>

        <div className="field">
          <label>Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {preview && (
          <div style={{ marginBottom: '15px' }}>
            <img
              src={preview}
              alt="preview"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        <button className="ui button blue" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditContact;
