import React from 'react';
import Header from '../../components/Header/Header'
import Policies from '../../components/Policies/Policies'
import Footer from '../../components/Footer/Footer'
import './PrivacyPolicy.css';
import privacyImage from './Policy.png';
import ParticlesBackground from '../../components/Particles/ParticlesBackground';


function PrivacyPolicy() {
  return (
    <div className="PrivacyPolicy">
      <Header />
      <div className="privacy-wrapper">
        {/* Particles Background */}
        <div className="policy-particles-wrapper">
          <ParticlesBackground id="main-particles" />
        </div>
        <div className="privacy-left">
          <h1 className="privacy-heading">Privacy Policy</h1>
        </div>
        <div className="privacy-right">
          <img
            src={privacyImage}
            alt="Privacy Illustration"
            className="privacy-image"
          />
        </div>
      </div>
      <Policies />
      <div className='footer-policy'>
        <Footer />
      </div>
    </div>
  );
}

export default PrivacyPolicy;
