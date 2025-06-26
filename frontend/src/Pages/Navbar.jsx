import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import logo from '../Assets/images/download.png';

const Navbar = ({ darkMode, setDarkMode, setSidebarOpen }) => (
  <nav id="NAV">
    <div className="LOGO">
      <img className="img1" src={logo} alt="RCCG LOGO" />
    </div>

    {/* Desktop Nav Links */}
    <div className="NavContent desktop-only">
      <Link className="Content" to="/">Home</Link>
      <Link className="Content" to="/sermons">Sermons</Link>
      <Link to="/admin">Admin</Link>
      <Link className="Content" to="/prayer-wall">Prayer Wall</Link>
      <Link className="Content" to="/testimonies">Testimonies</Link>
      <Link className="Content" to="/volunteer">Volunteer</Link>
      <button className="mode-toggle desktop-only" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀ Light' : '🌙 Dark'}
      </button>
    </div>

    {/* Mobile Hamburger Button */}
    <button className="sidebar-toggle mobile-only" onClick={() => setSidebarOpen(true)}>
      ☰
    </button>
  </nav>
);

export default Navbar;
