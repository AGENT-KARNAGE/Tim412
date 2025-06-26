import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import './TestimonyCorner.css';

const TestimonyCorner = ({ user }) => {
  const [testimony, setTestimony] = useState('');
  const [testimonies, setTestimonies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testimony.trim()) return;
    await addDoc(collection(db, 'testimonies'), {
      testimony,
      user: user?.email || 'Anonymous',
      created: serverTimestamp()
    });
    setTestimony('');
    fetchTestimonies();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimony?')) {
      await deleteDoc(doc(db, 'testimonies', id));
      fetchTestimonies();
    }
  };

  const fetchTestimonies = async () => {
    const snapshot = await getDocs(collection(db, 'testimonies'));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTestimonies(data.sort((a, b) => b.created?.seconds - a.created?.seconds));
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

  return (
    <div className="testimony-corner">
      <h2>🎉 Testimony Corner</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={testimony}
          onChange={e => setTestimony(e.target.value)}
          placeholder="Share your testimony"
        />
        <button type="submit">Share</button>
      </form>
         </div>
  );
};

export default TestimonyCorner;
