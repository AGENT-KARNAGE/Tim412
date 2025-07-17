import React, { useState, useEffect } from 'react';
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

  const handleChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, formData, formSetter, programName) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5110/api/registration', {
        ...formData,
        program: programName
      });

      setAlertMessage(`✨ Thank you for registering for ${programName}`);
      setAlertType('success');
      formSetter({ fullName: '', age: '', email: '', phone: '', address: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('Something went wrong. Please try again.');
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
          <div className="ActivateForm">
            <h2>Register for Activate 1.0</h2>
            <form onSubmit={(e) => handleSubmit(e, activateForm, setActivateForm, 'Activate 1.0')}>
              <input name="fullName" placeholder="Full Name" value={activateForm.fullName} onChange={(e) => handleChange(e, setActivateForm)} required />
              <input name="age" type="number" placeholder="Age" value={activateForm.age} onChange={(e) => handleChange(e, setActivateForm)} required />
              <input name="email" type="email" placeholder="Email" value={activateForm.email} onChange={(e) => handleChange(e, setActivateForm)} required />
              <input name="phone" placeholder="Phone" value={activateForm.phone} onChange={(e) => handleChange(e, setActivateForm)} required />
              <textarea name="address" placeholder="Address" value={activateForm.address} onChange={(e) => handleChange(e, setActivateForm)} required />
              <button type="submit">Submit</button>
            </form>
          </div>

          <div className="ActivateForm">
            <h2>Register for Young & Winning</h2>
            <form onSubmit={(e) => handleSubmit(e, youngForm, setYoungForm, 'Young & Winning')}>
              <input name="fullName" placeholder="Full Name" value={youngForm.fullName} onChange={(e) => handleChange(e, setYoungForm)} required />
              <input name="age" type="number" placeholder="Age" value={youngForm.age} onChange={(e) => handleChange(e, setYoungForm)} required />
              <input name="email" type="email" placeholder="Email" value={youngForm.email} onChange={(e) => handleChange(e, setYoungForm)} required />
              <input name="phone" placeholder="Phone" value={youngForm.phone} onChange={(e) => handleChange(e, setYoungForm)} required />
              <textarea name="address" placeholder="Address" value={youngForm.address} onChange={(e) => handleChange(e, setYoungForm)} required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
