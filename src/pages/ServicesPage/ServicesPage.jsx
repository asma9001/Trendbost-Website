import React from 'react';
import Header from '../../components/Header/Header';
import './ServicesPage.css';
import ServicePageImage from './ServicePage.png';
import ParticlesBackground from '../../components/Particles/ParticlesBackground';
import Footer from '../../components/Footer/Footer';
import OurServices from '../../components/OurServices/OurServices';
import ServiceInfo from '../../components/ServiceInfo/ServiceInfo';
import Testimonial from '../../components/Testimonial/Testimonial';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <Header />
      {/* Particles Background */}
      <div className="serv-particles-wrapper">
        <ParticlesBackground id="tsparticles" />
      </div>
      {/* Main Content */}
      <div className="servicePage-wrapper">
        <div className="servicePage-left">
          <h1 className="servicePage-heading">Services</h1>
          <p className="servicePage-paragraph">
            Effortlessly boost your social presence with automated likes and smart engagement.
          </p>
        </div>
        <div className="servicePage-right">
          <img
            src={ServicePageImage}
            alt="Service Page Illustration"
            className="servicePage-image"
          />
        </div>
      </div>
      <OurServices />
      <ServiceInfo />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default ServicesPage;
