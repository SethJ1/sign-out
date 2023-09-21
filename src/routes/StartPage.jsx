import React from 'react';
import Banner from '../components/Banner';
import FreelancerCard from '../components/FreelancerCard';
import CustomerCard from '../components/CustomerCard';
import SubscriptionForm from '../components/SubscriptionForm';
import Footer from '../components/Footer';

const StartPage = () => {
  return (
    <div>
      <Banner />
      <h2 className="freelancer-title">Featured Freelancers</h2>
      <FreelancerCard /> 
      <div className="see-more-container">
        <button className="see-more-button">See More</button>
      </div>
      <h2 className="freelancer-title">Featured Customers</h2>
      <CustomerCard /> 
      <div className="see-more-container">
        <button className="see-more-button">See All Customers</button>
      </div>
      <SubscriptionForm />
      <Footer />
    </div>
  );
};

export default StartPage;
