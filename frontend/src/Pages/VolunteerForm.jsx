import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './VolunteerForm.css';


const VolunteerForm = () => {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [volunteers, setVolunteers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !interest) return;
    await addDoc(collection(db, 'volunteers'), { name, interest, created: new Date() });
    setName('');
    setInterest('');
    fetchVolunteers();
  };

  const fetchVolunteers = async () => {
    const snapshot = await getDocs(collection(db, 'volunteers'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setVolunteers(data);
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <div className="volunteer-form">
      <h2>Volunteer Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        <input value={interest} onChange={e => setInterest(e.target.value)} placeholder="Area you'd like to serve" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default VolunteerForm;