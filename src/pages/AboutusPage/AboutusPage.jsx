import React from 'react';
import Header from '../../components/Header/Header'
import About from '../../components/About/About'
import Footer from '../../components/Footer/Footer'
import './AboutusPage.css';
import AboutImage from './About-2.png';
import ParticlesBackground from '../../components/Particles/ParticlesBackground';


function AboutusPage() {
  return (
    <div className="AbouUs">
      <Header />
      <div className="aboutus-wrapper">
        {/* Particles Background */}
        <div className="aboutus-particles-wrapper">
          <ParticlesBackground id="main-particles" />
        </div>
        <div className="aboutus-left">
          <h1 className="aboutus-heading">About Us</h1>
        </div>
        <div className="aboutus-right">
          <img
            src={AboutImage}
            alt="aboutus Illustration"
            className="aboutus-image"
          />
        </div>
      </div>
      <About />
      <div className='footer-aboutus'>
        <Footer />
      </div>
    </div>
  );
}

export default AboutusPage;
