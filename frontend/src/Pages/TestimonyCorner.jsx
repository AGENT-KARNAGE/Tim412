import React, { useState } from 'react'; 
// import { db } from '../firebase-config';
// import { collection, addDoc } from 'firebase/firestore';
import './TestimonyCorner.css';
import axios from 'axios';

const TestimonyCorner = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', testimony: '' });
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
    if (!formData.testimony.trim()) {
      setErrorMsg('Please enter a testimony.');
      return;
    }

    try {
      await axios.post('http://localhost:5110/api/testimonies-volunteers', {
        ...formData,
        type: 'testimony'
      });

      setFormData({ name: '', email: '', phone: '', testimony: '' });
      setSuccessMsg('Thank you for sharing your testimony!');
    } catch (err) {
      console.error("❌ Error submitting testimony:", err.message);
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="testimony-corner">
      <h2><i className="fas fa-comment-dots"></i> Testimony Corner</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone Number"
          required
        />
        <textarea
          name="testimony"
          value={formData.testimony}
          onChange={handleChange}
          placeholder="Share your testimony"
          required
        />
        <button type="submit">Share</button>
      </form>

      {successMsg && <p className="success-message">{successMsg}</p>}
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </div>
  );
};

export default TestimonyCorner;
