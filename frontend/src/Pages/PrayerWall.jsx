import React, { useState, useEffect } from 'react';
// import { db } from '../firebase-config';
// import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import axios from 'axios';
import './PrayerWall.css';
import Loading from './Loading';
import CustomAlert from './CustomAlert';

const PrayerWall = ({ user }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [whenLastSubmitted, setWhenLastSubmitted] = useState(localStorage.getItem("whenLastSubmitted") || false);
  const today = new Date().toLocaleDateString();
  const checkUserSubmission = async () => {
    try {
      if (whenLastSubmitted === today) {
        setAlertMessage('Note: You have already submitted a prayer request today.');
        setAlertType('error');
      }
    } catch (err) {
      console.error('Error checking submission status:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (whenLastSubmitted === today) {
      setAlertMessage('You can only submit one prayer request per day.');
      setAlertType('error');
      return;
    }

    setLoading(true);
    try {
      // 🔽 Firebase version (commented out)
      // await addDoc(collection(db, 'prayerWall'), {
      //   message,
      //   created: serverTimestamp(),
      //   user: user?.email || 'Anonymous',
      // });

      // ✅ Custom backend version
      await axios.post('http://localhost:5110/api/prayerRequests', {
        message,
        user: user?.email || 'Anonymous',
      });

      setAlertMessage('Prayer request submitted successfully!');
      setAlertType('success');
      setMessage('');
      localStorage.setItem("whenLastSubmitted", today);
      setWhenLastSubmitted(today);
    } catch (err) {
      console.error('Error submitting prayer request:', err);
      setAlertMessage('Failed to submit prayer request.');
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSubmission();
  }, [user]);

  const handleTyping = (e) => {
    if (whenLastSubmitted === today) {
      setAlertMessage('You have already submitted a prayer request today. Please wait until tomorrow.');
      setAlertType('error');
      return //stop typing
    }
    setMessage(e.target.value);
  };

  return (
    <div className="prayer-wall">
      {loading && <Loading />}
      <CustomAlert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage('')}
      />

      <h2><i className="fas fa-praying-hands"></i> Prayer Wall</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={handleTyping}
          placeholder="Write a prayer request or praise report"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PrayerWall;
