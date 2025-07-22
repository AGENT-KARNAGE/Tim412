import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loading from './Loading';
import CustomAlert from './CustomAlert';
import './TestimonyCorner.css'; // Make sure this path is correct

const TestimonyCorner = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    testimony: '',
    category: '',
  });

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [allTestimonies, setAllTestimonies] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [formVisible, setFormVisible] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchTestimonies = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/testimonies-volunteers`);
      setAllTestimonies(res.data || []);
    } catch (err) {
      console.error('Error loading testimonies:', err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    // Name must have at least two words
    if (!formData.name.trim().includes(' ')) {
      errors.push('Please enter both your first name and surname.');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Enter a valid email address.');
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.push('Phone number must be 10 to 15 digits (numbers only).');
    }

    // Other required fields
    if (!formData.testimony.trim()) errors.push('Testimony cannot be empty.');
    if (!formData.category) errors.push('Please select a testimony category.');

    if (errors.length > 0) {
      setAlertMessage(errors.join(' '));
      setAlertType('error');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/testimonies-volunteers`, {
        ...formData,
        type: 'testimony'
      });

      setAlertMessage('Testimony submitted successfully!');
      setAlertType('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        testimony: '',
        category: '',
      });
      fetchTestimonies();
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.message;
      console.error('Submission failed:', serverMsg);
      setAlertMessage(`Failed: ${serverMsg}`);
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  };

const filteredTestimonies = allTestimonies
  .filter((entry) => {
    const hasSearch = search.trim() !== '';
    const hasCategory = filterType !== 'all';

    const matchSearch =
      (entry.name?.toLowerCase()?.includes(search.toLowerCase()) || false) ||
      (entry.testimony?.toLowerCase()?.includes(search.toLowerCase()) || false);

    const matchType =
      entry.category?.toLowerCase() === filterType.toLowerCase();

    if (!hasSearch && !hasCategory) return true;
    if (matchSearch && matchType) return true;
    if (hasSearch && matchSearch) return true;
    if (hasCategory && matchType) return true;
    return false;
  })
  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  useEffect(() => {
    fetchTestimonies();
  }, []);

  // 👁️ Intersection Observer effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFormVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (formRef.current) observer.observe(formRef.current);
    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  return (
    <div className="testimony-corner">
      {loading && <Loading />}
      <CustomAlert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage('')}
      />

      <h2>
        <i className="fas fa-comment-dots"></i> Testimony Corner
      </h2>

      {/* FORM BLOCK */}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        style={{
          opacity: formVisible ? 1 : 0,
          transform: formVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.6s ease',
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Testimony Category</option>
          <option value="healing">Healing</option>
          <option value="provision">Provision</option>
          <option value="salvation">Salvation</option>
          <option value="others">Others</option>
        </select>
        <textarea
          name="testimony"
          placeholder="Write your testimony..."
          value={formData.testimony}
          onChange={handleChange}
        />
        <button type="submit">
          <i className="fas fa-paper-plane"></i> Submit Testimony
        </button>
      </form>

      {/* FILTERS */}
      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search by name or word..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '10px',
            width: '100%',
          }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '100%',
            marginTop: '10px',
          }}
        >
          <option value="all">All Types</option>
          <option value="healing">Healing</option>
          <option value="provision">Provision</option>
          <option value="salvation">Salvation</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* TESTIMONY LIST */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#137c54' }}>
          <i className="fas fa-bible"></i> Recent Testimonies
        </h3>

        {filteredTestimonies.length === 0 ? (
          <p>No testimonies match your search.</p>
        ) : (
          <div
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              paddingRight: '10px',
              marginTop: '10px',
            }}
          >
            {filteredTestimonies.map((entry) => (
              <div
                key={entry._id}
                style={{
                  backgroundColor: '#eef8f3',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '15px',
                  animation: 'fadeIn 0.4s ease-in-out',
                }}
              >
                <h4 style={{ marginBottom: '5px', color: '#137c54' }}>
                  <i className="fas fa-user"></i> {entry.name}{' '}
                  <small style={{ fontWeight: 'normal' }}>({entry.category})</small>
                </h4>
                <p style={{ color: '#232424ff' }}>{entry.testimony}</p>
                <small style={{ color: '#555' }}>
                  <div>
                    <a href={`mailto:${entry.email}`}>
                      <i className="fas fa-envelope"></i> {entry.email}
                    </a>
                    &nbsp;|&nbsp;
                    <a href={`tel:${entry.phone}`}>
                      <i className="fas fa-phone"></i> {entry.phone}
                    </a>
                  </div>
                  <i className="fas fa-calendar-alt"></i>{' '}
                  {new Date(entry.createdAt).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonyCorner;