import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPaypal, FaCreditCard, FaWallet } from "react-icons/fa";
import axiosInstance from "../../axiosInstance.js";
import "./Check.css";

const Check = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userInfo,
    selectedMethod,
    plan,
    platform,
    filteredPlans,
    type,
    likes,
    comments,
    followers,
    liveAudience,
  } = location.state || {};
  console.log(filteredPlans);
  console.log(plan);
  const paymentDetails = userInfo?.paymentMethods?.[0]?.paymentDetails || {};

  const calculateTotalPrice = () => {
    let planPrice = 0;
    if (type === "Customized" && filteredPlans && filteredPlans.length > 0) {
      const planDetails = filteredPlans[0];
      planPrice += (planDetails.pricePerLike || 0) * (likes || 0);
      planPrice += (planDetails.pricePerComment || 0) * (comments || 0);
      planPrice += (planDetails.pricePerFollower || 0) * (followers || 0);
      planPrice += (planDetails.pricePerAudience || 0) * (liveAudience || 0);
    } else if (plan) {
      planPrice = plan.price || 0;
    }
    return planPrice;
  };
  console.log(userInfo);

  const totalPrice = calculateTotalPrice();
  console.log(totalPrice);
  const handleProceed = async () => {
    const orderData = {
      platform_Name:
        type === "Customized" ? filteredPlans[0].platform_Name : platform,
      planType:
        type === "Customized" ? filteredPlans[0].planType : plan.planType,
      planName: type === "Customized" ? "Customized" : plan.planName,
      planPrice: totalPrice,
      transactionId: "TX1",
      userId: userInfo?._id,
      subscriptionId: type !== "Customized" ? plan?._id : "",
      customizedPlanId: type === "Customized" ? filteredPlans[0]?._id : "",
      likes:likes,
      comments:comments,
      followers:followers,
      liveAudience:liveAudience,
      paymentMethod: selectedMethod,
      paymentInfo: {
        paypalId: paymentDetails?.paypalId || "",
        paypalEmail: paymentDetails?.paypalEmail || "",
        cardNumber: paymentDetails?.cardNumber || "",
        expirationDate: paymentDetails?.expirationDate || "",
        cardholderName: paymentDetails?.cardholderName || "",
        walletId: paymentDetails?.walletId || "",
      },
    
    };
    try {
      const response = await axiosInstance.post("/orders/", orderData);

      if (response.status === 201) {
        navigate("/pop-up", { state: { platform } });
      } else {
        navigate("/pop-up", { state: { platform } });
        console.error("Failed to create order:", response.data);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const renderPaymentMethodDetails = () => {
    switch (selectedMethod) {
      case "Paypal":
        return (
          <div className="unique-check-payment-method-container">
            <div className="unique-check-icon-label-container">
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "Paypal"}
                readOnly
              />
              <FaPaypal className="unique-check-payment-icon" />
              <span className="unique-check-payment-label">PayPal</span>
              <span className="green-tick">✓</span>
            </div>
            <div className="unique-check-payment-details">
              <div className="unique-check-form-row">
                <div className="unique-check-form-group">
                  <label>PayPal ID</label>
                  <input
                    type="text"
                    value={paymentDetails.paypalId || ""}
                    readOnly
                  />
                </div>
                <div className="unique-check-form-group">
                  <label>PayPal Email</label>
                  <input
                    type="email"
                    value={paymentDetails.paypalEmail || ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "Credit/Debit":
        return (
          <div className="unique-check-payment-method-container">
            <div className="unique-check-icon-label-container">
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "Credit/Debit"}
                readOnly
              />
              <FaCreditCard className="unique-check-payment-icon" />
              <span className="unique-check-payment-label">
                Credit/Debit Card
              </span>
              <span className="green-tick">✓</span>
            </div>
          </div>
        );
      case "CryptoWallet":
        return (
          <div className="unique-check-payment-method-container">
            <div className="unique-check-icon-label-container">
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "CryptoWallet"}
                readOnly
              />
              <FaWallet className="unique-check-payment-icon" />
              <span className="unique-check-payment-label">Crypto Wallet</span>
              <span className="green-tick">✓</span>
            </div>
            <div className="unique-check-payment-details show">
              <div className="unique-check-form-row">
                <div className="unique-check-form-group">
                  <label>Wallet ID</label>
                  <input
                    type="text"
                    value={paymentDetails.walletId || ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="check-unique-container">
      <div className="unique-column-1">
        <h2 className="unique-check-payment-heading">Info Detail</h2>
        <form className="unique-info-form">
          <div className="unique-form-row">
            <input
              className="unique-form-row-name"
              type="text"
              value={userInfo?.firstName}
              readOnly
            />
            <input
              className="unique-form-row-name"
              type="text"
              value={userInfo?.lastName}
              readOnly
            />
          </div>
          <div className="unique-form-row">
            <input type="email" value={userInfo?.email} readOnly />
          </div>
        </form>

        <br />
        <div className="unique-check-payment-container">
          <h2 className="unique-check-payment-heading">Payment Methods</h2>

          <div className="unique-check-payment-options">
            {renderPaymentMethodDetails()}
          </div>
        </div>

        <button className="unique-pay-now" onClick={handleProceed}>
          <span className="btn-text">Pay Now</span>
        </button>
      </div>

      <div className="unique-column-2">
        <h2 className="unique-check-payment-heading">Package Details</h2>
        <div className="unique-package-detail">
          <div className="unique-package-row">
            <p className="unique-package-name">
              {type === "Customized"
                ? filteredPlans?.[0]?.platform_Name
                : plan?.platform}
            </p>
            <p className="unique-package-name">
              {type === "Customized"
                ? filteredPlans?.[0]?.planName
                : plan?.planName}{" "}
              (
              {type === "Customized"
                ? filteredPlans?.[0]?.planType
                : plan?.planType}
              )
            </p>
          </div>
          <div className="unique-package-summary">
            <div className="unique-package-row">
              <p className="unique-package-name">
                <strong>Subtotal:</strong>
              </p>
              <p className="unique-package-price">{totalPrice} Rs</p>
            </div>
            <hr />
            <div className="unique-package-row">
              <p className="unique-package-name">
                <strong>Total:</strong>
              </p>
              <p className="unique-package-price">
                <strong style={{ color: "black" }}>{totalPrice} Rs</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check;
