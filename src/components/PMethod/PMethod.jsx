import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../axiosInstance.js";
import {
  FaPaypal,
  FaCreditCard,
  FaWallet,
  FaTrashAlt,
  FaArrowLeft,
} from "react-icons/fa";
import "./PMethod.css";
import toast from "react-hot-toast";

const PMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [existingMethods, setExistingMethods] = useState([]);
  const [showNewMethods, setShowNewMethods] = useState(false);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    orderId,
    plan,
    platform,
    filteredPlans,
    type,
    likes,
    comments,
    followers,
    liveAudience,
  } = location.state;
console.log("id",orderId);
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axiosInstance.get(
          `/userProfileSettings/${userId}`
        );
        const methods = response.data.user.paymentMethods || [];
        setExistingMethods(methods);

        if (methods.length > 0) {
          setSelectedMethod(methods[0].paymentMethod);
          setOpenSection(methods[0].paymentMethod);
        }

        setUserInfo(response.data.user);
      } catch (error) {
        console.error("Error fetching payment methods", error);
        setExistingMethods([]);
      }
    };
    fetchPaymentMethods();
  }, []);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setOpenSection(openSection === method ? null : method);
  };

  const handleProceed = () => {
    if (!selectedMethod && existingMethods.length > 0) {
      setSelectedMethod(existingMethods[0].paymentMethod);
      setOpenSection(existingMethods[0].paymentMethod);
    }

    navigate("/checkout-page", {
      state: {
        orderId,
        selectedMethod,
        userInfo,
        plan,
        platform,
        filteredPlans,
        type,
        likes,
        comments,
        followers,
        liveAudience,
      },
    });
  };

  const handleAddNewMethod = () => {
    setShowNewMethods(true);
    setSelectedMethod("");
  };

  const handleRemoveMethod = async (index) => {
    const userId = localStorage.getItem("userId");
    const methodToRemove = existingMethods[index];

    try {
      await axiosInstance.delete(
        `/paymentMethod/deleteCard/${methodToRemove._id}`,
        {
          data: { userId },
        }
      );

      const newMethods = [...existingMethods];
      newMethods.splice(index, 1);
      setExistingMethods(newMethods);

      if (selectedMethod === methodToRemove.paymentMethod) {
        setSelectedMethod(
          newMethods.length > 0 ? newMethods[0].paymentMethod : ""
        );
      }
    } catch (error) {
      console.error("Error removing payment method", error);
    }
  };

  const handleBack = () => {
    setShowNewMethods(false);
    setSelectedMethod("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const paymentData = {
      userId: userId,
      paymentMethod: selectedMethod,
      paymentInfo: formData,
    };

    try {
      const response = await axiosInstance.post("/paymentMethod", paymentData);

      const newMethod = {
        paymentMethod: selectedMethod,
        paymentDetails: formData,
      };
      setExistingMethods([...existingMethods, newMethod]);

      setFormData({});
      setSelectedMethod("");
      setShowNewMethods(false);

      toast.success("Payment method added successfully");
    } catch (error) {
      console.error("Error adding payment method", error);
      toast.error("Error adding payment method");
    }
  };

  return (
    <div className="PMethod-main-container">
      <div className="payment-container">
        <div className="heading-container">
          {showNewMethods && (
            <FaArrowLeft className="back-icon" onClick={handleBack} />
          )}
          <h2 className="payment-heading">Payment Methods</h2>
        </div>

        <div className="payment-options">
          {!showNewMethods && existingMethods.length > 0 && (
            <div className="existing-methods">
              <h3 className="section-heading">Your Payment Methods</h3>
              {existingMethods.map((method, index) => (
                <div
                  key={index}
                  className="payment-method-container existing-method"
                >
                  <div className="payment-method-header">
                    <label className="payment-option-label">
                      <input
                        type="radio"
                        name="existingMethod"
                        checked={selectedMethod === method.paymentMethod}
                        onChange={() =>
                          handleMethodChange(method.paymentMethod)
                        }
                      />
                      <div
                        className={`payment-option ${
                          selectedMethod === method.paymentMethod
                            ? "active"
                            : ""
                        }`}
                        onClick={() => handleMethodChange(method.paymentMethod)}
                      >
                        <div className="icon-label-container">
                          {method.paymentMethod === "Paypal" && (
                            <FaPaypal className="payment-icon" />
                          )}
                          {method.paymentMethod === "Credit/Debit" && (
                            <FaCreditCard className="payment-icon" />
                          )}
                          {method.paymentMethod === "CryptoWallet" && (
                            <FaWallet className="payment-icon" />
                          )}
                          <span className="payment-label">
                            {method.paymentMethod === "Paypal" &&
                              method.paymentDetails.paypalEmail}
                            {method.paymentMethod === "Credit/Debit" &&
                              `**** **** **** ${method.paymentDetails.cardNumber.slice(
                                -4
                              )}`}
                            {method.paymentMethod === "CryptoWallet" &&
                              method.paymentDetails.walletId}
                          </span>
                        </div>
                      </div>
                    </label>
                    <FaTrashAlt
                      className="remove-icon"
                      onClick={() => handleRemoveMethod(index)}
                    />
                  </div>
                  {openSection === method.paymentMethod && (
                    <div className="payment-method-details">
                      <div className="payment-details-menu">
                        <p>
                          Details for {method.paymentMethod}:
                          {method.paymentMethod === "Paypal" &&
                            ` ID: ${method.paymentDetails.paypalId}, Email: ${method.paymentDetails.paypalEmail}`}
                          {method.paymentMethod === "Credit/Debit" &&
                            ` Card Number: **** **** **** ${method.paymentDetails.cardNumber.slice(
                              -4
                            )}, Expiration Date: ${
                              method.paymentDetails.expirationDate
                            }, Cardholder Name: ${
                              method.paymentDetails.cardholderName
                            }`}
                          {method.paymentMethod === "CryptoWallet" &&
                            ` Wallet ID: ${method.paymentDetails.walletId}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="PMethod-button-container">
                <button
                  className="PMethod-proceed-button"
                  onClick={handleProceed}
                >
                  Proceed
                </button>
              </div>
            </div>
          )}

          {!showNewMethods && (
            <div className="PMethod-button-container">
              <button
                className="PMethod-add-method-button"
                onClick={handleAddNewMethod}
              >
                Add Payment Method
              </button>
            </div>
          )}

          {showNewMethods && (
            <>
              {/* PayPal Payment Option */}
              <div className="payment-method-container">
                <div
                  className={`payment-option ${
                    selectedMethod === "Paypal" ? "active" : ""
                  }`}
                  onClick={() => handleMethodChange("Paypal")}
                >
                  <div className="icon-label-container">
                    <FaPaypal className="payment-icon" />
                    <span className="payment-label">PayPal</span>
                  </div>
                </div>
                <div
                  className={`payment-details ${
                    openSection === "Paypal" ? "show" : ""
                  }`}
                >
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>PayPal ID</label>
                      <input
                        type="text"
                        name="paypalId"
                        placeholder="Enter your PayPal ID"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="payment-form-group">
                      <label>PayPal Email</label>
                      <input
                        type="email"
                        name="paypalEmail"
                        placeholder="Enter your PayPal email"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Credit/Debit Card Payment Option */}
              <div className="payment-method-container">
                <div
                  className={`payment-option ${
                    selectedMethod === "Credit/Debit" ? "active" : ""
                  }`}
                  onClick={() => handleMethodChange("Credit/Debit")}
                >
                  <div className="icon-label-container">
                    <FaCreditCard className="payment-icon" />
                    <span className="payment-label">Credit/Debit Card</span>
                  </div>
                </div>
                <div
                  className={`payment-details ${
                    openSection === "Credit/Debit" ? "show" : ""
                  }`}
                >
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="payment-form-group">
                      <label>Name on card</label>
                      <input
                        type="text"
                        name="cardholderName"
                        placeholder="John Doe"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>Expiration Date</label>
                      <input
                        type="text"
                        name="expirationDate"
                        placeholder="MM/YY"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="payment-form-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="123"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Crypto Wallet Payment Option */}
              <div className="payment-method-container">
                <div
                  className={`payment-option ${
                    selectedMethod === "CryptoWallet" ? "active" : ""
                  }`}
                  onClick={() => handleMethodChange("CryptoWallet")}
                >
                  <div className="icon-label-container">
                    <FaWallet className="payment-icon" />
                    <span className="payment-label">Crypto Wallet</span>
                  </div>
                </div>
                <div
                  className={`payment-details ${
                    openSection === "CryptoWallet" ? "show" : ""
                  }`}
                >
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>Wallet ID</label>
                      <input
                        type="text"
                        name="walletId"
                        placeholder="Enter your wallet ID"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="PMethod-button-container">
                <button
                  className="PMethod-proceed-button"
                  onClick={handleFormSubmit}
                >
                  Proceed
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PMethod;
