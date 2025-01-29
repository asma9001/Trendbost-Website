import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import logo from "./logo.png";
import { useAuth } from "../../context/auth";
import axiosInstance from "../../axiosInstance.js";

function useDebounce(func, delay) {
  const timeoutRef = React.useRef(null);

  const debouncedFunction = (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunction;
}

function Header() {
  const [auth, setAuth] = useAuth();
  const [shrink, setShrink] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({}); // Initialize as an empty object

  // Check for token in localStorage
  useEffect(() => {
    const getDetails = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axiosInstance.get(`/userProfileSettings/${userId}`);
        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };
    if (isLoggedIn) {
      getDetails();
    }
  }, [isLoggedIn]); // Only run on component mount or when isLoggedIn changes

  const hideMiddleLinks =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";
  const showLoginButton =
    location.pathname === "/signup" || location.pathname === "/forgot-password";
  const showSignupButton = location.pathname === "/login";

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleScroll = useDebounce(() => {
    setShrink(window.scrollY > 50);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Navbar expand="lg" className={`header-navbar ${shrink ? "shrink" : ""}`}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            className={`navbar-logo ${shrink ? "shrink-logo" : ""}`}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!hideMiddleLinks && (
            <Nav className="mx-auto nav-links">
              <Nav.Link href="/">HOME</Nav.Link>
              <Nav.Link href="/services">SERVICES</Nav.Link>
              <Nav.Link href="/privacy-policy">PRIVACY POLICY</Nav.Link>
              <Nav.Link href="/about-us">ABOUT US</Nav.Link>
              <Nav.Link href="/contact-us">CONTACT US</Nav.Link>
            </Nav>
          )}

          <Nav className="ms-auto align-items-center">
            {!isLoggedIn ? (
              <>
                {showLoginButton && (
                  <Button className="nav-btn" onClick={handleLogin}>
                    LOGIN
                  </Button>
                )}
                {showSignupButton && (
                  <Button className="nav-btn" onClick={handleSignup}>
                    SIGNUP
                  </Button>
                )}
                {!showLoginButton && !showSignupButton && (
                  <Button className="nav-btn" onClick={handleLogin}>
                    LOGIN
                  </Button>
                )}
              </>
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  className="nav-btn"
                >
                  {userDetails.firstName || "Profile"}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="head-dropdown"
                  style={{ right: 0, left: "auto" }}
                >
                  <Dropdown.Item
                    onClick={() => navigate("/user-dashboard")}
                    className="head-dropdown-item"
                  >
                    User Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="head-dropdown-item"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;