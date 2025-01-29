import React, { useEffect, useState } from 'react';
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from 'react-icons/io5';
import './Questions.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { question: "How do i sign up?", answer: "Click on the 'Sign Up' button on the homepage, fill in your details, and create your account within minutes." },
    { question: "Is my social media account safe?", answer: "Yes, we ship to many countries worldwide." },
    { question: "Can i customize TrendBost settings?", answer: "You can track your order through the tracking link provided in your email." },
    { question: "Will using this services violates social media policies?", answer: "We accept Visa, MasterCard, PayPal, and more." },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
  }, []);

  return (
    <div className="faq-container">
      <h1 className="faq-header" data-aos="fade-down">FAQ’s - Frequently Asked Questions</h1>
      <div className="accordion-wrapper">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-accordion" data-aos="fade-up" data-aos-delay={`${index * 200}`}>
            <div className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <IoArrowUpCircleOutline className="icon" />
                ) : (
                  <IoArrowDownCircleOutline className="icon" />
                )}
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
