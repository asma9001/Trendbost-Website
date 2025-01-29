import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPaasword from "./pages/ForgotPasword/ForgotPassword";
import ProfileSettting from "./pages/PrrofilePage/ProfilePage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import AboutusPage from "./pages/AboutusPage/AboutusPage";
import ContactusPage from "./pages/ContactusPage/ContactusPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import Subscription from "./pages/Subscription/Subscription";
import CustPlan from "./pages/CustomizedPlan/CustPlan";
import Payment from "./pages/Payment/Payment";
import PurchaseHistory from "./pages/PurchaseHistory/PurchaseHistory";
import UserDashboard from "./pages/UserDashboard/UserDashboad";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import AddLinksPage from "./pages/AddLinksPage/AddLinksPage";
import Popup from "./pages/Popup/Popup";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/auth";
import PrivateRoute from "./routes/PrivateRoute";
import { jwtDecode } from "jwt-decode";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userId"));
  const [isToken, setIsToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      
      setIsLoggedIn(false);
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    }

    const sessionTimeout = setTimeout(() => {
      localStorage.clear();
      setIsLoggedIn(false);
      window.location.href = "/login";
    }, 3600000);

    return () => clearTimeout(sessionTimeout);
  }, [isToken]);
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPaasword />} />
          <Route path="/profile-setting" element={<ProfileSettting />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about-us" element={<AboutusPage />} />
          <Route path="/contact-us" element={<ContactusPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/subscription" element={<Subscription />} />

          {/* <Route path="/" element={<PrivateRoute />}> */}
          <Route path="/customized-plan" element={<CustPlan />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/add-links" element={<AddLinksPage />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/checkout-page" element={<CheckoutPage />} />
          <Route path="/pop-up" element={<Popup />} />
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
