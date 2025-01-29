import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ServiceInfo.css";

// Countdown Hook
const useCountdown = (targetValue, duration) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const step = targetValue / duration;
    
    const interval = setInterval(() => {
      if (startValue < targetValue) {
        startValue += step;
        setValue(Math.floor(startValue)); // Round to avoid decimals
      } else {
        setValue(targetValue);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [targetValue, duration]);

  return value;
};

const ServiceInfo = () => {
  // Using the countdown hook for 99%, 4+, and +1000
  const percentage = useCountdown(99, 40);
  const years = useCountdown(4, 30);
  const clients = useCountdown(1000, 40);

  return (
    <div className="info-component-bg">
      {/* Main Heading */}
      <Container className="text-center py-5">
        <h1 className="info-main-heading">Why Choose Us?</h1>
        <h3 className="info-sub-heading">What Makes Us Different</h3>
      </Container>

      {/* Two Columns */}
      <Container>
        <Row className="align-items-center">
          {/* Left Column */}
          <Col md={6} className="info-left-column">
            <h2 className="info-column-heading">{percentage}%</h2>
            <p className="info-column-paragraph">
              Our advanced algorithms ensure that your posts consistently
              receive authentic engagement, boosting visibility and interaction
              effortlessly.
            </p>
          </Col>

          {/* Vertical Divider */}    
          <Col md={1} className="info-divider">
            <div className="vertical-line"><hr /></div>
          </Col>

          {/* Right Column */}
          <Col md={5} className="info-right-column">
            {/* Upper Div */}
            <div className="info-right-section">
              <h4 className="info-section-heading">{years}+</h4>
              <p className="info-section-paragraph">
                Years of proven expertise in enhancing social media profiles
                with safe, efficient, and results-driven methods.
              </p>
            </div>
            <hr />
            {/* Lower Div */}
            <div className="info-right-section">
              <h4 className="info-section-heading">+{clients}</h4>
              <p className="info-section-paragraph">
                Over 1,000 satisfied clients trust us to elevate their online
                presence and grow their social media influence.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServiceInfo;
