import React from 'react';
import './Policies.css';

function Policies() {
    return (
        <div className="privacy-container">
            <h1 className="privacy-head">Privacy Policies</h1>
            <p className="privacy-para center" >last updated: November 14, 2024</p>
            <p className='privacy-paragraph'>This Privacy Policy outlines the policies and procedures of Trend Bost on the collection, use, and disclosure of your information when you use our services (the "Service"). It also informs you about your privacy rights and how the law protects you. By using the Service, You agree to the collection and use of information as described in this Privacy Policy.</p>
            <div className="privacy-content">
                <h2>Interpretation and Definitions</h2>
                <h5>Interpretation</h5>
                <p>
                    Capitalized terms used in this Privacy Policy have the meanings defined below. These definitions hold the same meaning whether they appear in singular or plural form.                </p>
                <h2>Collecting and Using Your Personal Data</h2>
                <h5>Personal Data</h5>
                <p>
                    We may ask for personally identifiable information, including but not limited to:
                    <ul>
                        <li>First and last name.</li>
                        <li>Email address.</li>
                        <li>Usage data</li>
                    </ul>
                </p>
                <h5>Usage Data</h5>
                <p>
                    Usage Data is collected automatically and may include:
                    <ul>
                        <li>Your Device’s Internet Protocol (IP) address</li>
                        <li> Browser type and version.</li>
                        <li>Pages visited and time spent.</li>
                        <li>Mobile device details (e.g., device type, OS, unique ID, and diagnostic data).</li>
                    </ul>
                </p>
                <h5>Retention of Your Personal Data</h5>
                <p>We retain Personal Data only as long as necessary for the purposes outlined in this Privacy Policy. Usage Data may be kept longer for analytical purposes unless otherwise required by law.</p>
                
                <h5>Children's Privacy</h5>
                <p> Our Service is not intended for individuals under 13. If you are aware that a child has provided us with Personal Data, please contact us.</p>
               
                <h5>Links to Other Websites</h5>
                <p>Our Service may link to third-party websites not operated by us. We are not responsible for their content, privacy policies, or practices</p>
               
                <h5>Changes to This Privacy Policy</h5>
                <p>We may update this Privacy Policy periodically. Changes are effective when posted, with the "Last updated" date reflecting the latest revision.</p>
            </div>
        </div>
    );
}

export default Policies;
