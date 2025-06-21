import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import './Auth.css';

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

  const googleProvider = new GoogleAuthProvider();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const userCredential = isRegistering
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      if (isRegistering && userCredential.user) {
        await sendEmailVerification(userCredential.user);
        alert('Verification email sent. Please verify your email before logging in.');
      }

      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setIsAuthenticated(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Hide auth box if already logged in
  if (isAuthenticated) return null;

  return (
    <div style={wrapper}>
      <div className="auth-container">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleAuth} className="auth-form">
          {isRegistering && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
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
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <button onClick={handleGoogleLogin}>Sign In with Google</button>
        <button className="toggle" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </button>
        <button className="signout" onClick={handleSignOut}>Sign Out</button>
      </div>
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
