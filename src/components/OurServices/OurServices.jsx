import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./OurServices.css";
import Instagram from "./instagram.png";
import Facebook from "./facebook.png";
import Twitter from "./twitter.png";
import Tiktok from "./tiktok.png";
import TiktokLive from "./tiktok-live.png"; 

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-left-arrow" onClick={onClick}>
      &#9664;
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-right-arrow" onClick={onClick}>
      &#9654;
    </button>
  );
};

const OurServices = () => {
  const navigate = useNavigate(); 

  const socialMedia = [
    {
      name: "Instagram",
      icon: <img src={Instagram} alt="Instagram Logo" className="platform-logo" />,
      description: "Grow your Instagram with auto likes, comments, and reactions.",
    },
    {
      name: "Facebook",
      icon: <img src={Facebook} alt="Facebook Logo" className="platform-logo" />,
      description: "Enhance your Facebook with auto likes, comments, and reactions.",
    },
    {
      name: "Twitter",
      icon: <img src={Twitter} alt="Twitter Logo" className="platform-logo" />,
      description: "Boost your Twitter with auto likes, retweets, and replies.",
    },
    {
      name: "TikTok",
      icon: <img src={Tiktok} alt="TikTok Logo" className="platform-logo" />,
      description: "Grow your TikTok with auto likes, comments, and live engagement.",
    },
    {
      name: "TikTok Live",
      icon: <img src={TiktokLive} alt="TikTok Live Logo" className="platform-logo" />,
      description: "Boost your TikTok Live with real-time engagement and visibility.",
    },
  ];

  const handleSubscriptionRedirect = (platformName) => {
    navigate("/subscription", { state: { platform: platformName } }); 
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };

  return (
    <Container className="social-media-container my-5">
      <h1 className="text-center mb-4 heading">Our Services</h1>
      <p className="text-justify mx-auto mb-4 description">
        Effortlessly enhance your social presence with boosting visibility,
        engagement, and growth across all your platforms.
      </p>

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {socialMedia.map((platform, index) => (
          <div key={index} className="d-flex justify-content-center carousel-item-wrapper">
            <Card className="text-center shadow-sm card-with-border ">
              <Card.Body>
                <div className="mb-3">{platform.icon}</div>
                <Card.Title>{platform.name}</Card.Title>
                <Card.Text className="description-text">
                  {platform.description}
                </Card.Text>
                <Button
                  variant="primary"
                  className="card-btn"
                  onClick={() => handleSubscriptionRedirect(platform.name)}
                >
                  View Subscription
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Carousel>
    </Container>
  );
};

export default OurServices;