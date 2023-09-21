import "./Footer.css"
import React from 'react';
import { Icon } from 'semantic-ui-react';

const Footer = () => {
  const socialMediaIcons = [
    { icon: 'facebook', link: '#' },
    { icon: 'instagram', link: '#' },
    { icon: 'twitter', link: '#' },
  ];

  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h2>For Dev</h2>
          <ul>
            <li><a href="#">How it works</a></li>
            <li><a href="#">How to create a profile</a></li>
            <li><a href="#">Find Jobs</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h2>For Clients</h2>
          <ul>
            <li><a href="#">How it Works</a></li>
            <li><a href="#">How to post a job</a></li>
            <li><a href="#">Find Dev</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h2>Stay Connected</h2>
          <div className="social-icons">
            {socialMediaIcons.map((item, index) => (
              <a key={index} href={item.link}>
                <Icon name={item.icon} size="big" link />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-text">
        <p>
          DEVLink &copy; {new Date().getFullYear()} |{' '}
          <a href="#">Privacy Policy</a> | <a href="#">Terms</a> | <a href="#">Code of Conduct</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
