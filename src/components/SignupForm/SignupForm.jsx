import React, { useState } from "react";
import "./SignupForm.css";
import signupImage from "./signup.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts

    const userData = {
      firstName,
      lastName,
      email,
      phoneNo,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/userAuth/register",
        userData
      );

      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate("/login"); // Redirect to login page
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again!!");
    } finally {
      setLoading(false); // Set loading to false when the request ends
    }
  };

  return (
    <div className="signup-page-updated">
      <div className="signup-container-updated">
        {/* Left Column: Signup Form */}
        <div className="left-column-updated">
          <h2 className="signup-heading-updated">Sign Up</h2>
          <form onSubmit={signupHandler}>
            {/* First Name and Last Name Fields */}
            <div className="form-row-updated">
              <div className="form-group-updated">
                <label htmlFor="first-name" className="form-label-updated">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="form-control-updated"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-updated">
                <label htmlFor="last-name" className="form-label-updated">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="form-control-updated"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email and Phone Fields */}
            <div className="form-row-updated">
              <div className="form-group-updated">
                <label htmlFor="email" className="form-label-updated">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control-updated"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-updated">
                <label htmlFor="phone" className="form-label-updated">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control-updated"
                  placeholder="Enter your phone number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password and Confirm Password Fields */}
            <div className="form-row-updated">
              <div className="form-group-updated">
                <label htmlFor="password" className="form-label-updated">
                  Password
                </label>
                <div className="password-container-updated">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className="form-control-updated"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-toggle-icon-updated"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="form-group-updated">
                <label
                  htmlFor="confirm-password"
                  className="form-label-updated"
                >
                  Confirm Password
                </label>
                <div className="password-container-updated">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirm-password"
                    className="form-control-updated"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-toggle-icon-updated"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms and Privacy Policy Checkbox */}
            <div className="checkbox-group-signup">
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="checkbox-signup"
              />
              <label htmlFor="terms" className="checkbox-label-signup">
                I agree to the terms and privacy policy
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="submit-button-updated"
              disabled={loading}
            >
              {loading ? "Loading...." : "Create an Account"}
            </button>
          </form>

          {/* Login Link */}
          <a href="/login" className="login-link-updated">
            Already a member? <span className="login-text-updated">Login</span>
          </a>
        </div>

        {/* Right Column: Image */}
        <div className="right-column-updated">
          <img src={signupImage} alt="Signup" />
        </div>
      </div>
    </div>
  );
}

export default SignupForm;