import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; // Import AOS styles
import './Features.css';
import { FaLock, FaRobot, FaUserFriends, FaHeadset } from 'react-icons/fa';
import AOS from 'aos';

function FeaturesGrid() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1 second
  }, []);

  return (
    <div className="features-grid-section">
      <div className="container">
        {/* Main Heading */}
        <h1
          className="features-grid-heading text-center"
          data-aos="fade-down" // Animate from top
        >
          Features
        </h1>

        {/* Feature Boxes */}
        <div className="row justify-content-center">
          {/* Feature 1 */}
          <div
            className="col-md-3 d-flex flex-column align-items-stretch"
            data-aos="fade-down" // Animate from left
          >
            <div className="feature-grid-box">
              <div className="icon-circle blue-bg">
                <FaLock className="feature-icon" />
              </div>
              <h5 className="feature-box-heading">Secure and Reliable</h5>
              <p className="feature-box-paragraph">
                Our platform ensures your data is fully protected with advanced encryption. We prioritize your privacy and never share your information with third parties.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="col-md-3 d-flex flex-column align-items-stretch"
            data-aos="fade-down" // Animate from left
          >
            <div className="feature-grid-box">
              <div className="icon-circle pink-bg">
                <FaRobot className="feature-icon" />
              </div>
              <h5 className="feature-box-heading">Fully Automated</h5>
              <p className="feature-box-paragraph">
                Effortlessly boost engagement with our fully automated system. Our platform works seamlessly in the background, liking posts across various platforms on your behalf.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="col-md-3 d-flex flex-column align-items-stretch"
            data-aos="fade-down" // Animate from left
          >
            <div className="feature-grid-box">
              <div className="icon-circle blue-bg">
                <FaUserFriends className="feature-icon" />
              </div>
              <h5 className="feature-box-heading">Engaged Users</h5>
              <p className="feature-box-paragraph">
                Join a thriving community of active users. Our service helps you consistently engage with your audience, providing likes that align with your preferences.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div
            className="col-md-3 d-flex flex-column align-items-stretch"
            data-aos="fade-down" // Animate from left
          >
            <div className="feature-grid-box">
              <div className="icon-circle pink-bg">
                <FaHeadset className="feature-icon" />
              </div>
              <h5 className="feature-box-heading">24/7 Customer Support</h5>
              <p className="feature-box-paragraph">
                Got questions? Our dedicated support team is available around the clock to assist you with any issues or concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesGrid;
