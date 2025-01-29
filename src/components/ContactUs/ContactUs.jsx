import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';
import contactImg from './contact.png'; // Assuming you have a contact image

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function ContactUs() {
  return (
    <div className="contactus-section">
      <div className="contactus-container shadow rounded">
        {/* Main Heading */}
        <h2 className="contactus-heading text-center">Contact Us</h2>

        <div className="row">
          {/* Left Column: Contact Form */}
          <div className="col-md-6 contactus-form-column">
            <h3 className="contactus-form-heading">Get in Touch</h3>
            <p className="contactus-description">We are here for you! How can we help?</p>
            <form>
              <div className="contactus-form-group mb-3">
                <label htmlFor="nameInput" className="contactus-label">Name</label>
                <input type="text" className="contactus-input" id="nameInput" />
              </div>
              <div className="contactus-form-group mb-3">
                <label htmlFor="emailInput" className="contactus-label">Email</label>
                <input type="email" className="contactus-input" id="emailInput" />
              </div>
              <div className="contactus-form-group mb-4">
                <label htmlFor="messageInput" className="contactus-label">Message</label>
                <input className="contactus-input" id="messageInput" />
              </div>
              <button type="submit" className="btn btn-primary contactus-submit-btn">Submit</button>
            </form>
          </div>

          {/* Right Column: Contact Information */}
          <div className="col-md-6 contactus-info-column">
            <img src={contactImg} alt="Contact Us" className="contactus-image img-fluid" />
            <div className="row contactus-info mt-4">
              <div className="col-6 contactus-info-left">
                <div className="contactus-info-item d-flex align-items-center mb-3">
                  <FaMapMarkerAlt className="contactus-icon" />
                  <span className="ms-2">123 TrendBost Street, City, Country</span>
                </div>
                <div className="contactus-info-item d-flex align-items-center mb-3">
                  <FaPhoneAlt className="contactus-icon" />
                  <span className="ms-2">+123 456 7890</span>
                </div>
                <div className="contactus-info-item d-flex align-items-center">
                  <FaEnvelope className="contactus-icon" />
                  <span className="ms-2">ahsanehsan00@gmail.com</span>
                </div>
              </div>
              <div className="col-6 contactus-info-right d-flex justify-content-end align-items-start">
                <div className="contactus-social-icons">
                  <a href="https://facebook.com" className="contactus-social-icon"><FaFacebook /></a>
                  <a href="https://instagram.com" className="contactus-social-icon"><FaInstagram /></a>
                  <a href="https://twitter.com" className="contactus-social-icon"><FaTwitter /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
