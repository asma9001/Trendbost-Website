import React, { useState } from 'react';
import './ForgotForm.css';
import forgotImage from './forgot.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ForgotForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="forgotForm_page">
            <div className="forgotForm_container">
                {/* Left Column: Forgot Form */}
                <div className="forgotForm_leftColumn">
                    <h2 className="forgotForm_heading">Forgot Password</h2>
                    <form>
                        {/* Email Field */}
                        <div className="forgotForm_formGroup">
                            <label htmlFor="email" className="forgotForm_label">Enter Your Email</label>
                            <input
                                type="email"
                                id="email"
                                className="forgotForm_input"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="forgotForm_submitButton">Submit</button>
                    </form>

                    {/* Back to Login Link */}
                    <a href="/login" className="forgotForm_backToLoginLink">
                        Remembered your password? Login <span className="forgotForm_loginText">here</span>
                    </a>
                </div>

                {/* Right Column: Image */}
                <div className="forgotForm_rightColumn">
                    <img src={forgotImage} alt="Forgot Password" />
                </div>
            </div>
        </div>
    );
}

export default ForgotForm;
