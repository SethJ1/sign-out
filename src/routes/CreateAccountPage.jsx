import React, { useState } from 'react';
import Input from '../components/Input';
import { Link } from 'react-router-dom'; 
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth, signInWithGooglePopup } from '../Utils/firebase';
import '../components/Login.css';

const Signup = (props) => {
  const [contact, setContact] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [feedback, setFeedback] = useState('');

  const { displayName, email, password, confirmPassword } = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setFeedback('Passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocFromAuth(user, { displayName });
      setFeedback('Account created successfully');
    } catch (error) {
      setFeedback(`Error in creating user: ${error.message}`);
    }
  };

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocFromAuth(user);
      setFeedback('Signed in with Google successfully');
    } catch (error) {
      setFeedback(`Error signing in with Google: ${error.message}`);
    }
  };

  return (
    <div className='header-div'>
      <h1>Create Account</h1>
      <br />
      <Input
        name='displayName'
        type='text'
        placeholder='name'
        onChange={handleChange}
        value={contact.displayName}
      />
      <br />
      <Input
        name='email'
        type='email'
        placeholder='email'
        onChange={handleChange}
        value={contact.email}
      />
      <br />
      <Input
        name='password'
        type='password'
        placeholder='password'
        onChange={handleChange}
        value={contact.password}
      />
      <br />
      <Input
        name='confirmPassword'
        type='password'
        placeholder='confirm password'
        onChange={handleChange}
        value={contact.confirmPassword}
      />
      <br />
      
      <button onClick={handleSubmit}>Sign Up</button>
      <br />
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <br />
      <p>Already have an account? <Link to="/">Login</Link></p>

      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Signup;
