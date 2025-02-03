import React, { useState } from "react";
import "./LoginForm.css";
import loginImage from "./login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance.js";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

function LoginForm() {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/userAuth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200 || response.status === 201) {
        const userRole = response.data.userRole;
        const token = response.data.token;

        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", token);
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Invalid credentials. Please try again");
      }
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginForm_page">
      <div className="loginForm_container">
        {/* Left Column: Login Form */}
        <div className="loginForm_leftColumn">
          <h2 className="loginForm_heading">Login</h2>
          {loading && <div className="spinner"></div>}
          <form onSubmit={loginHandler}>
            {/* Email Field */}
            <div className="loginForm_formGroup">
              <label htmlFor="email" className="loginForm_label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="loginForm_input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="loginForm_formGroup">
              <label htmlFor="password" className="loginForm_label">
                Password
              </label>
              <div className="loginForm_passwordContainer">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="loginForm_input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="loginForm_passwordToggleIcon"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="options-row">
              <div className="checkbox-group-login">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="checkbox-login"
                />
                <label htmlFor="terms" className="checkbox-label-signup">
                  Remember Me
                </label>
              </div>
              <Link to="/forgot-password" className="loginForm_forgot">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="loginForm_submitButton"
              disabled={loading}
            >
              {loading ? "Loading...." : "Login"}
            </button>
          </form>

          {/* Sign Up Link */}
          <Link to="/signup" className="loginForm_signupLink">
            Not registered yet? Create an account{" "}
            <span className="loginForm_signupText">SignUp</span>
          </Link>
        </div>

        {/* Right Column: Image */}
        <div className="loginForm_rightColumn">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
