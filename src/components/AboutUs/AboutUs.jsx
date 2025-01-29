import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css';
import about from './about.png';

function AboutUs() {
  const aboutRef = useRef(null); // Reference to the AboutUs section
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  useEffect(() => {
    const handleScroll = () => {
      const rect = aboutRef.current.getBoundingClientRect();
      
      // Check if the AboutUs section is visible in the viewport
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true); // Make the section visible
      } else {
        setIsVisible(false); // Hide the section when it's out of view
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={aboutRef} className={`about-uss-section ${isVisible ? 'visible' : ''}`}>
      <div className="about-uss-container">
        {/* Left Box: About Us Heading and Paragraph */}
        <div className={`about-text-box fade-in fade-top ${isVisible ? 'visible' : ''}`}>
          <h1 className="about-heading">About Us</h1>
          <p className="about-paragraph">
            Welcome to <strong>TRENDBOST</strong>, where we make social media engagement effortless. Our platform is dedicated to helping you amplify your online presence by automatically liking posts on your favorite social media platforms.
            We understand the importance of consistent engagement in today’s digital world. That’s why we’ve designed a solution that works tirelessly in the background, ensuring your account stays active and interactive without any extra effort from you.
            With <strong>TRENDBOST</strong>, your social media posts will always receive the attention they deserve. Sit back, relax, and let us handle the likes!
          </p>
        </div>

        {/* Right Box: Image */}
        <div className={`about-image-box fade-in fade-left ${isVisible ? 'visible' : ''}`}>
          <img src={about} alt="About Us" className="about-image" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
