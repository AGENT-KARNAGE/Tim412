
import React, { useState, useEffect } from 'react';
import '../styles/styles.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation
} from 'react-router-dom';

import Navbar from './Navbar';
import Header from './Header';
import WelcomeSection from './WelcomeSection';
import SermonSection from './SermonSection';
import Events from './Events';
import YouthOfTheMonth from './YouthOfTheMonth';
import ThisWeekWithTim412 from "./ThisWeekWithTim412";
import PrayerWall from './PrayerWall';
import TestimonyCorner from './TestimonyCorner';
import VolunteerForm from './VolunteerForm';
import MediaGallery from './MediaGallery';
import Footer from './Footer';
import Auth from './Auth';
import Admin from './Admin';
import AdminDashboard from './AdminDashboard';
import MediaUpload from './MediaUpload';
import NotFound from './NotFound';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   return () => unsubscribe();
  // }, []);


  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  if (storedUser && storedToken) {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
    }
  }
}, []);

   console.log(user ? user : "no user yet")

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <Router>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setSidebarOpen={setSidebarOpen}
        />

        <Header />
        {!user && <Auth setUser={setUser} />}

         <div className="route-wrapper fade">
          <Routes>
            <Route path="/" element={<LandingPage user={user} />} />
            <Route path="/sermons" element={<SermonSection />} />
            <Route path="/events" element={<Events />} />
            <Route path="/prayer-wall" element={<PrayerWall user={user} />} />
            <Route path="/testimonies" element={<TestimonyCorner user={user} />} />
            <Route path="/volunteer" element={<VolunteerForm />} />
            <Route path="/upload" element={user ? <MediaUpload /> : <Navigate to="/" replace />} />
            <Route path="/gallery" element={user ? <MediaGallery user={user} /> : <Navigate to="/" replace />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen, user }) {
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false); // auto-close on route change
  }, [location.pathname, setSidebarOpen]);

  return (
    <div className={`sidebar slide-in ${sidebarOpen ? 'open' : ''}`}>
      <Link to="/">Home</Link>
      <Link to="/sermons">Sermons</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/prayer-wall">Prayer Wall</Link>
      <Link to="/testimonies">Testimonies</Link>
      <Link to="/volunteer">Volunteer</Link>
      {user && <Link to="/upload">Upload</Link>}
      {user && <Link to="/gallery">Gallery</Link>}
      {user?.email === 'admin@example.com' && <Link to="/admin">Admin</Link>}
    </div>
  );
}

function LandingPage({ user }) {
  return (
    <div className="fade">
      <WelcomeSection user={user} /> {/* ✅ Pass user prop here */}
      <SermonSection />
      <Events />
      <YouthOfTheMonth />
      <ThisWeekWithTim412 />
      <PrayerWall user={user} />
      <TestimonyCorner user={user} />
      <VolunteerForm />
      <Footer />

    </div>
  );
}

export default App;
