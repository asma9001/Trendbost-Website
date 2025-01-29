import React from 'react';
import './About.css';
import aboutImage from './about-1.png';


function About() {
    return (
        <div className="about1">
            <h1 className="about1-heading">Welcome to TRENDBOST</h1>
            <p className="about1-paragraph">
            Welcome to TRENDBOST, where we make social media engagement effortless. Our platform is dedicated to helping you amplify your online presence by automatically liking posts on your favorite social media platforms.We understand the importance of consistent engagement in today’s digital world. That’s why we’ve designed a solution that works tirelessly in background, ensuring your account stays active and interactive without any extra effort from you.With TRENDBOST, your social media posts will always receive the attention they deserve. Sit back, relax,and let us handle  likes!
            </p>
            <div className="about1-image-container">
                <img src={aboutImage} alt="About Illustration" className="about1-image" />
            </div>
            <p className="about1-paragraph">
            Welcome to TRENDBOST, where we make social media engagement effortless. Our platform is dedicated to helping you amplify your online presence by automatically liking posts on your favorite social media platforms.We understand the importance of consistent engagement in today’s digital world. That’s why we’ve designed a solution that works tirelessly in background, ensuring your account stays active and interactive without any extra effort from you.With TRENDBOST, your social media posts will always receive the attention they deserve. Sit back, relax,and let us handle  likes!
            </p>
        </div>
    );
}

export default About;
