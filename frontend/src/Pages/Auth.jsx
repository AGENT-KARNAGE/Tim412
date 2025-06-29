import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Auth.css';

// 🔒 Firebase imports (still commented out for future use)
// import { auth } from '../firebase-config';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   sendEmailVerification,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from 'firebase/auth';

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('none');
  const [education, setEducation] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertText, setAlertText] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

   // ✅ Input Validation Function
  const validateForm = () => {
    const newErrors = {};

    // Email
    if (!email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';

    // Password
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (isRegistering) {
      if (!firstName) newErrors.firstName = 'First name is required';
      if (!lastName) newErrors.lastName = 'Last name is required';
      if (!age) newErrors.age = 'Age is required';
      if (!education) newErrors.education = 'Education is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


useEffect(() => {
  if (alertVisible) {
    const timeout = setTimeout(() => {
      setAlertVisible(false);
    }, 41000);

    return () => clearTimeout(timeout);
  }
}, [alertVisible]);

  // ✅ Load user from localStorage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, [setUser]);

 // ✅ Handle Auth with Validation
  const handleAuth = async (e) => {
    e.preventDefault();

   if (!validateForm()) {
  setAlertText('Please fix the errors above.');
  setAlertVisible(true);
  return;
}

if (isRegistering && (age < 16 || age > 24)) {
  setAlertText("Please visit our main church site instead: https://newsprings-raqf.vercel.app/");
  setAlertVisible(true);
  return;
}

    try {
      if (isRegistering) {
        const res = await axios.post('http://localhost:5110/api/auth/register', {
          firstname: firstName,
          lastname: lastName,
          age,
          department,
          education,
          email,
          password,
        });

        setAlertText('Registration successful!');
        setAlertVisible(true);
        setUser(res.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
      } else {
        const res = await axios.post('http://localhost:5110/api/auth/login', {
          email,
          password,
        });

        setAlertText('Login successful!');
        setAlertVisible(true);
        setUser(res.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      setAlertText(error.response?.data?.message || 'Something went wrong');
      setAlertVisible(true);
    }
  };
  // 🔒 Google login – still commented for future Firebase support
  // const handleGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     setUser(result.user);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // 🔒 Sign out – still commented
  // const handleSignOut = async () => {
  //   await signOut(auth);
  //   setUser(null);
  //   setIsAuthenticated(false);
  // };

  if (isAuthenticated) return null;

   return (
    <div className="auth-container">
     {alertVisible && (
  <div className="alert-box">
    {
      alertText.includes('http') ? (
        <p>
          Please visit our main site the youth church age range is from 16 - 24 and you are currently {age} :{" "}
          <a href={alertText.match(/https?:\/\/\S+/)?.[0]} target="_blank" rel="noopener noreferrer">
            {alertText.match(/https?:\/\/\S+/)?.[0]}
          </a>
        </p>
      ) : (
        <p>{alertText}</p>
      )
    }
    <button onClick={() => setAlertVisible(false)}>OK</button>
  </div>
)}


      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleAuth} className="auth-form">
        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <span className="error">{errors.age}</span>}

            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="none">None</option>
              <option value="ushering">Ushering</option>
              <option value="media">Media</option>
              <option value="music">Music</option>
            </select>

            <input
              type="text"
              placeholder="Education Level"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
            {errors.education && <span className="error">{errors.education}</span>}
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>

      <button
        className="toggle"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setErrors({});
          setAlertText('');
          setAlertVisible(false);
        }}
      >
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
};

const wrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '120vh',
};

export default Auth;