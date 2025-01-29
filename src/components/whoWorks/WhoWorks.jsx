import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WhoWorks.css';
import work1 from './1.png';
import work2 from './2.png';
import work3 from './3.png';

function WhoWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      },
      { threshold: 0.5 }
    );

    const features = sectionRef.current.querySelectorAll('.work-box, .work-heading, .work-paragraph');
    features.forEach(feature => observer.observe(feature));

    return () => {
      features.forEach(feature => observer.unobserve(feature));
    };
  }, []);

  return (
    <div className="whowork" style={{ backgroundColor: 'white' }}>
      <div className="works-section" ref={sectionRef}>
        <div className="container text-center">
          {/* Main Heading */}
          <h1 className="work-heading">How it Works - 3 Easy Steps</h1>
          <p className="work-paragraph" style={{ color: '#DB46CD' }}>
            Boost your social media engagement effortlessly.
          </p>

          {/* Feature Boxes */}
          <div className="row justify-content-center">
            {/* Feature 1 */}
            <div className="col-md-4 d-flex flex-column align-items-center">
              <div className="work-box">
                <div className="number-circle">1</div>
                <img src={work1} alt="work 1" className="work-image" />
              </div>
              <p className="work-content">
                Visit our website and sign up using your email or social media account. Our quick registration process ensures you’re ready in minutes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4 d-flex flex-column align-items-center">
              <div className="work-box">
                <div className="number-circle">2</div>
                <img src={work2} alt="Work 2" className="work-image" />
              </div>
              <p className="work-content">
                Securely connect your social media accounts on our platform. Select the accounts where you’d like the auto-liking feature to be activated.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4 d-flex flex-column align-items-center">
              <div className="work-box">
                <div className="number-circle">3</div>
                <img src={work3} alt="Work 3" className="work-image" />
              </div>
              <p className="work-content">
                Customize your settings and let our platform handle the rest. Your connected profiles will automatically like posts based on your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhoWorks;
