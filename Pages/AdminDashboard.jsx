import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const fetchData = async () => {
    const testimonySnap = await getDocs(collection(db, 'testimonies'));
    const prayerSnap = await getDocs(collection(db, 'prayerWall'));
    const volunteerSnap = await getDocs(collection(db, 'volunteers'));

    setTestimonies(testimonySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setRequests(prayerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setVolunteers(volunteerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
    fetchData(); // Refresh list
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧑‍💼 Admin Dashboard</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>📖 Testimonies</h3>
        <ul>
          {testimonies.map((item) => (
            <li key={item.id}>
              {item.testimony}
              <button onClick={() => handleDelete('testimonies', item.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🙏 Prayer Requests</h3>
        <ul>
          {requests.map((item) => (
            <li key={item.id}>
              {item.message}
              <button onClick={() => handleDelete('prayerWall', item.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>🙋 Volunteers</h3>
        <ul>
          {volunteers.map((item) => (
            <li key={item.id}>
              {item.name} - {item.interest}
              <button onClick={() => handleDelete('volunteers', item.id)} style={{ marginLeft: '10px' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;

