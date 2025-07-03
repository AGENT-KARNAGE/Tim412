import React, { useState, useEffect } from 'react';
// import { db } from '../firebase-config';
// import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import axios from 'axios';
import './PrayerWall.css';

const PrayerWall = ({ user }) => {
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState([]);

  // ✅ Submit handler using custom backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // 🔽 Firebase version (commented out)
      // await addDoc(collection(db, 'prayerWall'), {
      //   message,
      //   created: serverTimestamp(),
      //   user: user?.email || 'Anonymous',
      // });

      // ✅ Custom backend version
      await axios.post('http://localhost:5110//api/prayer-requests', {
        message,
        user: user?.email || 'Anonymous',
      });

      setMessage('');
      fetchRequests();
    } catch (err) {
      console.error('Error submitting prayer request:', err);
    }
  };

  // ✅ Delete handler using custom backend
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this prayer request?')) {
      try {
        // 🔽 Firebase version (commented out)
        // await deleteDoc(doc(db, 'prayerWall', id));

        // ✅ Custom backend version
        await axios.delete(`http://localhost:5110//api/prayer-requests/${id}`);

        fetchRequests();
      } catch (err) {
        console.error('Error deleting request:', err);
      }
    }
  };

  // ✅ Fetch all requests using custom backend
  const fetchRequests = async () => {
    try {
      // 🔽 Firebase version (commented out)
      // const querySnapshot = await getDocs(collection(db, 'prayerWall'));
      // const data = querySnapshot.docs.map(doc => ({
      //   id: doc.id,
      //   ...doc.data()
      // }));
      // setRequests(data.sort((a, b) => b.created?.seconds - a.created?.seconds));

      // ✅ Custom backend version
      const res = await axios.get('http://localhost:5110/api/prayer-requests');
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
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

      <ul className="requests">
        {requests.map(req => (
          <li key={req._id || req.id}>
            <p>{req.message}</p>
            <small>— {req.user}</small>
            <button onClick={() => handleDelete(req._id || req.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrayerWall;
