import React, { useState, useEffect } from 'react';
import './Events.css';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import MediaUpload from './MediaUpload';
import MediaGallery from './MediaGallery';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const Admin = () => {
  const [adminView, setAdminView] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [adminData, setAdminData] = useState({
    activate: [], young: [], volunteers: [], prayers: [], testimonies: [], users: 0
  });
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const tryAccessAdmin = () => {
    if (passwordInput === 'tim412admin') {
      setAdminView(true);
      fetchAdminData();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try{
    const activateSnap = await getDocs(collection(db, 'activateRegistrations'));
    const youngSnap = await getDocs(collection(db, 'youngAndWinningRegistrations'));
    const volunteerSnap = await getDocs(collection(db, 'volunteers'));
    const prayerSnap = await getDocs(collection(db, 'prayerWall'));
    const testimonySnap = await getDocs(collection(db, 'testimonies'));

    setAdminData({
      activate: activateSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      young: youngSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      volunteers: volunteerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      prayers: prayerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      testimonies: testimonySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      users: 100
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  setLoading(false);
};

  const deleteRegistration = async (program, id) => {
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, program, id));
      setAdminData(prev => {
        const keyMap = {
          activateRegistrations: 'activate',
          youngAndWinningRegistrations: 'young',
          volunteers: 'volunteers',
          testimonies: 'testimonies',
          prayerWall: 'prayers'
        };
        const key = keyMap[program];
        return {
          ...prev,
          [key]: prev[key].filter(item => item.id !== id)
        };
      });
    } catch (err) {
      console.error('Error deleting:', err);
    }
    setDeletingId(null);
  };

  const chartData = [
    { name: 'Activate 1.0', count: adminData.activate.length },
    { name: 'Young & Winning', count: adminData.young.length }
  ];

  const COLORS = ['#00a574', '#ff7f50'];

  if (!adminView) {
    return (
      <section className="Sec1">
        <div className="admin-login-box">
          <h2>Admin Access</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button onClick={tryAccessAdmin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="Sec1">
      <div className="admin-dashboard">
        <aside className="admin-sidebar">
          <ul>
            <li onClick={() => setSelectedSection('dashboard')} className={selectedSection === 'dashboard' ? 'active' : ''}>Dashboard</li>
            <li onClick={() => setSelectedSection('activate')} className={selectedSection === 'activate' ? 'active' : ''}>Activate Registrants</li>
            <li onClick={() => setSelectedSection('young')} className={selectedSection === 'young' ? 'active' : ''}>Young & Winning</li>
            <li onClick={() => setSelectedSection('upload')} className={selectedSection === 'upload' ? 'active' : ''}>Media Upload</li>
            <li onClick={() => setSelectedSection('gallery')} className={selectedSection === 'gallery' ? 'active' : ''}>Media Gallery</li>
            <li onClick={() => setSelectedSection('testimonies')} className={selectedSection === 'testimonies' ? 'active' : ''}>Testimonies</li>
            <li onClick={() => setSelectedSection('volunteers')} className={selectedSection === 'volunteers' ? 'active' : ''}>Volunteers</li>
            <li onClick={() => setSelectedSection('prayers')} className={selectedSection === 'prayers' ? 'active' : ''}>Prayer Wall</li>
          </ul>
        </aside>

        <main className="admin-main">
          <h2>Admin Dashboard</h2>

          {selectedSection === 'dashboard' && (
            <>
              <div className="admin-metrics">
                <div className="metric-card"><h3>Activate Registrations</h3><p>{adminData.activate.length}</p></div>
                <div className="metric-card"><h3>Young & Winning</h3><p>{adminData.young.length}</p></div>
                <div className="metric-card"><h3>Site Users</h3><p>{adminData.users}</p></div>
              </div>
              <h3>Registration Chart</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#00a574" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {selectedSection === 'activate' && (
            <div className="admin-entry-list">
              <h3>Activate Registrants</h3>
              {adminData.activate.map((user) => (
                <div key={user.id} className="admin-entry">
                  <p>{user.fullName} - {user.email}</p>
                  <button onClick={() => deleteRegistration('activateRegistrations', user.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}

          {selectedSection === 'young' && (
            <div className="admin-entry-list">
              <h3>Young & Winning Registrants</h3>
              {adminData.young.map((user) => (
                <div key={user.id} className="admin-entry">
                  <p>{user.fullName} - {user.email}</p>
                  <button onClick={() => deleteRegistration('youngAndWinningRegistrations', user.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}

          {selectedSection === 'upload' && (
            <>
              <h3>Media Upload</h3>
              <MediaUpload />
            </>
          )}

          {selectedSection === 'gallery' && (
            <>
              <h3>Media Gallery</h3>
              <MediaGallery user={{ email: 'admin@example.com' }} />
            </>
          )}

          {selectedSection === 'testimonies' && (
            <div className="admin-entry-list">
              <h3>Testimonies</h3>
              {adminData.testimonies.map((item) => (
                <div key={item.id} className="admin-entry">
                  <p>{item.testimony}</p>
                  <button onClick={() => deleteRegistration('testimonies', item.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}

          {selectedSection === 'volunteers' && (
            <div className="admin-entry-list">
              <h3>Volunteers</h3>
              {adminData.volunteers.map((item) => (
                <div key={item.id} className="admin-entry">
                  <p>{item.name} - {item.interest}</p>
                  <button onClick={() => deleteRegistration('volunteers', item.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}

          {selectedSection === 'prayers' && (
            <div className="admin-entry-list">
              <h3>Prayer Wall</h3>
              {adminData.prayers.map((item) => (
                <div key={item.id} className="admin-entry">
                  <p>{item.message}</p>
                  <button onClick={() => deleteRegistration('prayerWall', item.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default Admin;
