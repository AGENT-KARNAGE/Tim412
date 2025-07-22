import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Events.css';
import sundayImage from '../Assets/images/daniel-gutko-Op-UUTQLGtI-unsplash.jpg';
import tuesdayImage from '../Assets/images/samantha-sophia-NaWKMlp3tVs-unsplash.jpg';
import thursdayImage from '../Assets/images/nathan-mullet-pmiW630yDPE-unsplash.jpg';
import CustomAlert from './CustomAlert';
import Loading from './Loading';

const Events = () => {
  const [activateForm, setActivateForm] = useState({
    fullName: '', age: '', email: '', phone: '', address: ''
  });
  const [youngForm, setYoungForm] = useState({
    fullName: '', age: '', email: '', phone: '', address: ''
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const formRefs = useRef([]);
  const [visibleForms, setVisibleForms] = useState([]);

  const handleChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e, formData, formSetter, programName) => {
  e.preventDefault();

  // Validation
  const errors = [];

  // Full Name: Must include at least 2 words
  if (!formData.fullName.trim().includes(' ')) {
    errors.push('Please enter both your first name and surname.');
  }

  // Age: Must be between 16 and 24
  const age = Number(formData.age);
  if (!age || age < 16 || age > 24) {
    errors.push('Age must be between 16 and 24.');
  }

  // Email: Simple regex check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.push('Please enter a valid email address.');
  }

  // Phone: Must be 10-15 digits
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(formData.phone)) {
    errors.push('Phone number must contain only numbers (10 to 15 digits).');
  }

  if (errors.length > 0) {
    setAlertMessage(errors.join(' '));
    setAlertType('error');
    return;
  }

  // Proceed if no errors
  setLoading(true);
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/registration`, {
      ...formData,
      program: programName
    });

    setAlertMessage(response?.data?.message || `✨ Thank you for registering for ${programName}`);
    setAlertType('success');
    formSetter({ fullName: '', age: '', email: '', phone: '', address: '' });
  } catch (error) {
    console.error('Error submitting form:', error);
    const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Something went wrong. Please try again.';
    setAlertMessage(errorMessage);
    setAlertType('error');
  } finally {
    setLoading(false);
  }
};


  const services = [
    {
      day: 'SUNDAY', image: sundayImage, title: 'SUNDAY SERVICE',
      times: ['08:00 AM - 10:00 AM', '10:30 AM - 12:30 PM']
    },
    {
      day: 'TUESDAY', image: tuesdayImage, title: 'DIGGING DEEP',
      times: ['06:00 PM - 7:30 PM']
    },
    {
      day: 'THURSDAY', image: thursdayImage, title: 'PUSH',
      times: ['(Pray Until Something Happens)', '06:00 PM - 7:30 AM']
    },
    {
      day: 'SATURDAY', image: tuesdayImage, title: 'BRUNCH WITH JESUS',
      times: ['10:00 AM - 12:00 PM']
    },
    {
      day: 'FRIDAY', image: thursdayImage, title: 'ONLINE BIBLE STUDY',
      times: ['08:00 PM - 09:30 PM']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [services.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleForms(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    formRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      formRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const getVisibleServices = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(services[(currentIndex + i) % services.length]);
    }
    return visible;
  };

  return (
    <section className="Sec1">
      {loading && <Loading />}
      <CustomAlert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage('')}
      />

      <div className="events-wrapper-green">
        <div className="carousel-wrapper">
          <div className="sec1Container carousel">
            {getVisibleServices().map((service, i) => (
              <div className="Week" key={i}>
                <div className="Day">
                  <img className="DayImage" src={service.image} alt={service.title} />
                  <div className="DayText"><h2>{service.day}</h2></div>
                </div>
                <div className="Events">
                  <h2>{service.title}</h2>
                  {service.times.map((t, j) => <p className="Time" key={j}>{t}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div
            className="ActivateForm"
            data-index={0}
            ref={el => (formRefs.current[0] = el)}
            style={{
              opacity: visibleForms.includes(0) ? 1 : 0,
              transform: visibleForms.includes(0) ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease',
            }}
          >
            <h2>Register for Activate 1.0</h2>
            <form onSubmit={(e) => handleSubmit(e, activateForm, setActivateForm, 'Activate 1.0')}>
              {['fullName', 'age', 'email', 'phone'].map((name) => (
                <input
                  key={name}
                  name={name}
                  type={name === 'age' ? 'number' : name === 'email' ? 'email' : 'text'}
                  placeholder={name[0].toUpperCase() + name.slice(1)}
                  value={activateForm[name]}
                  onChange={(e) => handleChange(e, setActivateForm)}
                  required
                />
              ))}
              <textarea
                name="address"
                placeholder="Address"
                value={activateForm.address}
                onChange={(e) => handleChange(e, setActivateForm)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>

          <div
            className="ActivateForm"
            data-index={1}
            ref={el => (formRefs.current[1] = el)}
            style={{
              opacity: visibleForms.includes(1) ? 1 : 0,
              transform: visibleForms.includes(1) ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease',
            }}
          >
            <h2>Register for Young & Winning</h2>
            <form onSubmit={(e) => handleSubmit(e, youngForm, setYoungForm, 'Young & Winning')}>
              {['fullName', 'age', 'email', 'phone'].map((name) => (
                <input
                  key={name}
                  name={name}
                  type={name === 'age' ? 'number' : name === 'email' ? 'email' : 'text'}
                  placeholder={name[0].toUpperCase() + name.slice(1)}
                  value={youngForm[name]}
                  onChange={(e) => handleChange(e, setYoungForm)}
                  required
                />
              ))}
              <textarea
                name="address"
                placeholder="Address"
                value={youngForm.address}
                onChange={(e) => handleChange(e, setYoungForm)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Events;