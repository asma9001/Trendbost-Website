import React from "react";
import "./Testimonial.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import pic1 from "./pic2.png";
import pic2 from "./pic1.png";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Elizabeth Thomas",
      image: pic1,
      rating: "4.7/5",
      feedback: "Boosted my social media engagement within days! Highly recommended.",
    },
    {
      name: "Chris William",
      image: pic2,
      rating: "4.7/5",
      feedback: "My posts now consistently trend on platforms. A game-changer for creators.",
    },
    {
      name: "John Doe",
      image: pic1,
      rating: "5/5",
      feedback: "An amazing tool for content creators, the growth is phenomenal!",
    },
    {
      name: "Sarah Lee",
      image: pic2,
      rating: "4.8/5",
      feedback: "My audience grew exponentially thanks to this service. Highly recommended!",
    },
    {
      name: "Michael Smith",
      image: pic1,
      rating: "4.9/5",
      feedback: "The best investment for my brand! Results within a week. Don't hesitate!",
    },
    {
      name: "Linda Johnson",
      image: pic2,
      rating: "4.6/5",
      feedback: "This service works wonders, my followers increased drastically in no time.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <div className="testimonials-main-wrapper">
      <div className="testimonial-div">
        <div className="testimonials-container">
          <h2>Testimonials</h2>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="carousel-slide">
                <div className="testimonial-card">
                  <div className="testimonial-image-wrapper">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-image"
                    />
                  </div>
                  <div className="rating-badge">{testimonial.rating} Good!</div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.feedback}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
