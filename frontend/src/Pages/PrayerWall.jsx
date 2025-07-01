import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import './PrayerWall.css';

const PrayerWall = ({ user }) => {
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await addDoc(collection(db, 'prayerWall'), {
      message,
      created: serverTimestamp(),
      user: user?.email || 'Anonymous'
    });
    setMessage('');
    fetchRequests();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this prayer request?')) {
      await deleteDoc(doc(db, 'prayerWall', id));
      fetchRequests();
    }
  };

  const fetchRequests = async () => {
    const querySnapshot = await getDocs(collection(db, 'prayerWall'));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setRequests(data.sort((a, b) => b.created?.seconds - a.created?.seconds));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="prayer-wall">
 <h2><i className="fas fa-praying-hands"></i> Prayer Wall</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Write a prayer request or praise report"
        />
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
};

export default PrayerWall;
