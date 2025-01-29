import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import './Footer.css';
import logo from './logo.png'

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* Left Side: Logo */}
        <div className="footer-logo">
          <img src={logo} alt="Trendbost Logo" className="footer-logo-img" /> {/* Replace 'logo.png' with your logo file */}
        </div>

        {/* Right Side: Social Icons */}
        <div className="footer-social-icons">
          <a href="https://www.instagram.com" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com" className="social-icon">
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com" className="social-icon">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom-para">
        <p><span style={{color: '#000'}}>&copy; Copyrights 2024. Trendbost.</span> <span style={{color: '#DB46CD'}}>All Rights Reserved.</span></p>
      </div>
    </div>
  );
}

export default Footer;
