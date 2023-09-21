import "./SubscriptionForm.css"
import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add subscription logic here
    console.log('Subscribed:', email);
    // Clear the input field
    setEmail('');
  };

  return (
    <div className="subscription-form-container">
      <div className="subscription-form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <h2 className="form-title">Sign up for our Daily Insider</h2>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" color="teal">
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
