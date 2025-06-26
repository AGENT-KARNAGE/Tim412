import React from 'react';
import '../styles/styles.css';
import { FaTwitter, FaTiktok, FaYoutube, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Social Media */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="icons">
            <a href="https://twitter.com"><FaTwitter /></a>

            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: info@tim412.org</p>
          <p>Phone: +234 000 000 0000</p>
          <p>
            Address:
            <a
              href="https://www.google.com/maps?q=RCCG+Newsprings+Parish+Lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="address-link"
            >
              RCCG Newsprings Parish, Lagos
            </a>
          </p>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3>Stay Updated</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RCCG Newsprings TIM412. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
