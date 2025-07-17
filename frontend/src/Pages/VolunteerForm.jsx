import React, { useState } from 'react';
// import { db } from '../firebase-config';
// import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';
import './VolunteerForm.css';
import Loading from './Loading';
import CustomAlert from './CustomAlert';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: ''
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');

    if (!formData.name || !formData.interest) {
      setAlertMessage('Please fill in all fields.');
      setAlertType('error');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5110/api/testimonies-volunteers', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        testimony: formData.interest,
        type: 'volunteer',
        category: null
      });

      setFormData({ name: '', email: '', phone: '', interest: '' });
      setAlertMessage('Thank you for signing up to volunteer!');
      setAlertType('success');
    } catch (err) {
      setAlertMessage('Something went wrong. Please try again.');
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="volunteer-form">
      {loading && <Loading />}
      <CustomAlert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage('')}
      />

      <h2><i className="fas fa-hands-helping"></i> Volunteer Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="styled-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          className="styled-input"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <input
          className="styled-input"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone Number"
          required
        />
        <select
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          required
        >
          <option value="">Select Area to Volunteer</option>
          <option value="Ushering">Ushering</option>
          <option value="Choir">Choir</option>
          <option value="Media">Media</option>
          <option value="Evangelism">Evangelism</option>
          <option value="Prayer Team">Prayer Team</option>
          <option value="Protocol">Protocol</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
