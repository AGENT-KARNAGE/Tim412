import React, { useState, useEffect, useRef } from 'react';
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

  const formRef = useRef();
  const [formVisible, setFormVisible] = useState(false);

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
      await axios.post(`${process.env.REACT_APP_API_URL}/api/prayerRequests`, {
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

  const handleTyping = (e) => {
    if (whenLastSubmitted === today) {
      setAlertMessage('You have already submitted a prayer request today. Please wait until tomorrow.');
      setAlertType('error');
      return;
    }
    setMessage(e.target.value);
  };

  useEffect(() => {
    checkUserSubmission();
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFormVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (formRef.current) observer.observe(formRef.current);
    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  return (
    <div className="prayer-wall">
      {loading && <Loading />}
      <CustomAlert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage('')}
      />

      <h2><i className="fas fa-praying-hands"></i> Prayer Wall</h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          opacity: formVisible ? 1 : 0,
          transform: formVisible ? 'translateY(0px)' : 'translateY(40px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease'
        }}
      >
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
