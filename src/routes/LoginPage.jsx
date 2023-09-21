import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserDocFromAuth, signInWithGooglePopup, getCurrentUser, signOut, auth } from '../Utils/firebase';

import Input from '../components/Input';

const Login = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false); // Track sign-in state

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      // Check if the user is signed in
      setIsSignedIn(!!currentUser);
    };

    fetchCurrentUser();
  }, []);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login failed', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsSignedIn(false); // Update sign-in state
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocFromAuth(user);
      setIsSignedIn(true); // Update sign-in state
    } catch (error) {
      setError('Google Sign-In failed');
      console.error('Google Sign-In failed', error);
    }
  };

  return (
    <div className="header-div">
      <h1>Login</h1>
      {isSignedIn ? (
        // Display user information if signed in
        <React.Fragment>
          <span>Hello, {user?.email}</span>
          <button onClick={handleSignOut}>Sign Out</button>
        </React.Fragment>
      ) : (
        // Display sign-in form if not signed in
        <React.Fragment>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <br />
          <button onClick={handleSubmit}>Login</button>
          <br />
          {error && <p className="error-message">{error}</p>}
          <button onClick={logGoogleUser}>Sign in with Google</button>
          <br />
          <p>
            Don't have an account? <Link to="/create-account">Create Account</Link>
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

export default Login;
