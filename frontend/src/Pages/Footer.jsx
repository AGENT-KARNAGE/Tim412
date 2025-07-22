import { useState, useEffect, useRef } from 'react';
import './footer.css';
import axios from "axios";
import {
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setSubStatus("Please enter an email address.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setSubStatus("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/subscribe/newsubscribe`, { email });
      if (res.data.success) {
        setSubStatus("Thank you for subscribing!");
        setEmail("");
      }
    } catch (err) {
      setSubStatus(err?.response?.data?.message || "Failed to subscribe. Please try again later.");
    } finally {
      setLoading(false);
      setTimeout(()=>{
        setSubStatus("")
      },3000)
      
    }
  };

  const handleEmailClick = () => {
    const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=info@tim412.org";
    const mailto = "mailto:info@tim412.org";
    const newWindow = window.open(gmailUrl, "_blank");

    setTimeout(() => {
      if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
        window.location.href = mailto;
      }
    }, 1000);
  };

  return (
    <footer
      className={`footer shocking-footer ${visible ? 'footer-visible' : ''}`}
      ref={footerRef}
    >
      <div className="footer-content">
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

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          Email: <span onClick={handleEmailClick} className="shocking-email">info@tim412.org</span>
          <p>
            Phone: <a href="tel:+2340000000000">+234 000 000 0000</a>
          </p>
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

        <div className="footer-section newsletter">
          <h3>Stay Updated</h3>
          <form onSubmit={handleSubscribe}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              required
            />
            <button type="submit" disabled={loading} className="subscribe-btn">
              {loading ? (
                <span className="btn-content">
                  Subscribing<span className="spinner"></span>
                </span>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          <p>{subStatus}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RCCG Newsprings TIM412. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
