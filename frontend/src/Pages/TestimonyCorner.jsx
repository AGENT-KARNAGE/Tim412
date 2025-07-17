import React, { useState, useEffect } from 'react';
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchTestimonies = async () => {
    try {
      const res = await axios.get('http://localhost:5110/api/testimonies-volunteers');
      setAllTestimonies(res.data || []);
      console.log("we have gotten all testimony", res.data)
    } catch (err) {
      console.error('Error loading testimonies:', err.message);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const requiredFields = ['name', 'email', 'phone', 'testimony', 'category'];
  const missingFields = requiredFields.filter((field) => !formData[field].trim());

  if (missingFields.length > 0) {
    const formatted = missingFields.map((field) =>
      field.charAt(0).toUpperCase() + field.slice(1)
    ).join(', ');

    setAlertMessage(`Please fill in the following fields: ${formatted}`);
    setAlertType('error');
    return;
  }

  setLoading(true);
  try {
    await axios.post('http://localhost:5110/api/testimonies-volunteers', {
      ...formData,
      type: 'testimony' // optional — backend already handles it
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
  .filter((entry)=>{
    const hasSearch = search.trim() !== '';
    const hasCategory = filterType !== "all";
    
    if (!hasSearch && !hasCategory) return true;

    const matchSearch = entry.name.toLowerCase().includes(search.toLowerCase()) ||
                        entry.testimony.toLowerCase().includes(search.toLowerCase());
    const matchType = entry.category.toLowerCase() === filterType.toLowerCase();

    if (matchSearch && matchType) return true;
    if (hasSearch && matchSearch) return true;
    if (hasCategory && matchType) return true;  
    return false;
  }).
  sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));

  useEffect(() => {
    fetchTestimonies();
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

      {/* Form */}
      <form onSubmit={handleSubmit}>
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

      {/* Filters */}
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

      {/* Display testimonies */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#137c54' }}>
          <i className="fas fa-bible"></i> Recent Testimonies
        </h3>
        {filteredTestimonies.length === 0 ? (
          <p>No testimonies match your search.</p>
        ) : (
          filteredTestimonies.map((entry) => (
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
              <p>{entry.testimony}</p>
              <small style={{ color: '#555' }}>
                <i className="fas fa-envelope"></i> {entry.email} |{' '}
                <i className="fas fa-phone"></i> {entry.phone} |{' '}
                <i className="fas fa-calendar-alt"></i>{' '}
                {new Date(entry.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonyCorner;
