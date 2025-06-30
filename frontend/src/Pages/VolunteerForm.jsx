import React, { useState } from 'react';
// import { db } from '../firebase-config';
// import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';
import './VolunteerForm.css';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({ name: '', interest: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    if (!formData.name || !formData.interest) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5110/api/testimonies-volunteers', {
        name: formData.name,
        email: 'volunteer@placeholder.com', // you can change this or remove it later
        testimony: formData.interest,
        type: 'volunteer'
      });

      setFormData({ name: '', interest: '' });
      setSuccessMsg('Thank you for signing up to volunteer!');
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="volunteer-form">
      <h2>🙋 Volunteer Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="styled-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
        <input
          className="styled-input"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          placeholder="Area you'd like to serve"
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {successMsg && <p className="success-message">{successMsg}</p>}
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </div>
  );
};

export default VolunteerForm;