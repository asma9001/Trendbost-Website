import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import main from './main.png';
import ParticlesBackground from '../../components/Particles/ParticlesBackground';

function Main() {
  return (
    <div className="main-component">
      {/* Particles Background */}
      <div className="main-particles-wrapper">
        <ParticlesBackground id="tsparticles" />
      </div>
      <div className="container d-flex align-items-center h-100 position-relative">
        <div className="row w-100">
          {/* Left Side: Animated Heading, Paragraph, and Buttons */}
          <div className="col-md-6 text-white text-left">
            <h1 className="main-heading animate-item">TRENDBOST</h1>
            <p className="main-paragraph animate-item">
              Discover the best features and tools to enhance your productivity and simplify your life. Join now and experience the future!
            </p>
            <div className="button-group animate-item">
              <Button className="trial-button me-3">Free Trial</Button>
              <Button variant="light">Download App</Button>
            </div>
          </div>

          {/* Right Side: Image with Minor Up-and-Down Animation */}
          <div className="col-md-6 text-center">
            <img src={main} alt="App Preview" className="main-image img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
