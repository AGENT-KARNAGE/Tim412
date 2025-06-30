import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [mongoTestimonies, setMongoTestimonies] = useState([]);
  const [mongoVolunteers, setMongoVolunteers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activateRegs, setActivateRegs] = useState([]);
  const [youngWinningRegs, setYoungWinningRegs] = useState([]);

  const fetchData = async () => {
    try {
      // 🔥 Firebase data (still used for prayerWall only)
      const prayerSnap = await getDocs(collection(db, 'prayerWall'));
      setRequests(prayerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // 🌐 MongoDB: testimonies & volunteers
      const response = await axios.get('http://localhost:5110/api/testimonies-volunteers');
      const data = response.data;
      setMongoTestimonies(data.filter(entry => entry.type === 'testimony'));
      setMongoVolunteers(data.filter(entry => entry.type === 'volunteer'));

      // 🌟 Event registrations from backend
      const activateRes = await axios.get('http://localhost:5110/api/registrations/activate');
      const youngWinningRes = await axios.get('http://localhost:5110/api/registrations/young-winning');
      setActivateRegs(activateRes.data);
      setYoungWinningRegs(youngWinningRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧑‍💼 Admin Dashboard</h2>

      {/* ✅ MongoDB Testimonies */}
      <section style={{ marginBottom: '30px' }}>
        <h3>📖 Testimonies</h3>
        <ul>
          {mongoTestimonies.map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong> ({item.email})<br />
              {item.testimony}<br />
              <small>{formatDate(item.createdAt)}</small>
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ MongoDB Volunteers */}
      <section style={{ marginBottom: '30px' }}>
        <h3>🙋 Volunteers</h3>
        <ul>
          {mongoVolunteers.map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong> – {item.testimony}<br />
              <small>{formatDate(item.createdAt)}</small>
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ Firebase Prayer Requests */}
      <section style={{ marginBottom: '30px' }}>
        <h3>🙏 Prayer Requests</h3>
        <ul>
          {requests.map((item) => (
            <li key={item.id}>
              {item.message}
              <button onClick={() => deleteDoc(doc(db, 'prayerWall', item.id))} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ Activate Registrations */}
      <section style={{ marginBottom: '30px' }}>
        <h3>🔥 Activate 1.0 Registrations</h3>
        <ul>
          {activateRegs.map((item, index) => (
            <li key={index}>
              {item.fullName} | Age: {item.age} | Email: {item.email} | Phone: {item.phone}
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ Young & Winning Registrations */}
      <section>
        <h3>🌟 Young & Winning Registrations</h3>
        <ul>
          {youngWinningRegs.map((item, index) => (
            <li key={index}>
              {item.fullName} | Age: {item.age} | Email: {item.email} | Phone: {item.phone}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
