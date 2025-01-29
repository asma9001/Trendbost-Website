import React from 'react';
import Header from '../../components/Header/Header'
import Policies from '../../components/ContactUs/ContactUs'
import Footer from '../../components/Footer/Footer'
import './ContactusPage.css';
import contactImage from './Contact.png';
import ParticlesBackground from '../../components/Particles/ParticlesBackground';


function ContactusPage() {
  return (
    <div className="Contactus">
      <Header />
      <div className="contactus-wrapper">
        {/* Particles Background */}
        <div className="contactus-particles-wrapper">
          <ParticlesBackground id="contactus-particles" />
        </div>
        <div className="contactus-left">
          <h1 className="contactus-heading">Contact Us</h1>
        </div>
        <div className="contactus-right">
          <img
            src={contactImage}
            alt="contactus Illustration"
            className="contactus-image"
          />
        </div>
      </div>
      <Policies />
      <div className='footer-contactus'>
        <Footer />
      </div>
    </div>
  );
}

export default ContactusPage;
