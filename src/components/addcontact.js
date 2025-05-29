import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = ({ addContactHandeler }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ Added phone state
  const [image, setImage] = useState(null);
  const [error, setError] = useState(""); // To store the error message
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePhone = (phone) => {
    // Ensure the phone number is 10 digits and contains only numbers
    return phone.length === 10 && /^[0-9]{10}$/.test(phone);
  };

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      alert("All the fields are mandatory!");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return; // Don't submit if validation fails
    }

    addContactHandeler({ name, email, phone, image }); // Include phone
    setName("");
    setEmail("");
    setPhone(""); // Reset phone
    setImage(null);
    setError(""); // Clear error message
    navigate("/"); // Navigate back to the contact list
  };

  return (
    <div className="ui main" style={{ marginTop: '70px' }}>
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
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
        </div>
        {error && <div className="ui red message">{error}</div>} {/* Show error message */}

        <div className="field">
          <label>Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {image && (
          <div style={{ marginBottom: '10px' }}>
            <img
              src={image}
              alt="preview"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </div>
        )}
        <button className="ui button blue" type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
