import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SubPlans.css";
import axiosInstance from "../../axiosInstance.js";
import toast from "react-hot-toast";

const SubPlans = () => {
  const location = useLocation();
  const platform = location.state?.platform;
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState("");
  const [isYearly, setIsYearly] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get(
          `/subscriptionPlans/${platform}`
        );

        setSubscriptionPlans(response.data);
      } catch (error) {
        toast.error("Error fetching plans");
      }
    };

    if (platform) {
      fetchPlans();
    }
  }, [platform]);

  const handleToggle = (type) => {
    setIsYearly(type === "yearly");
  };

  const handleSelectPlan = (index) => {
    setSelectedPlan(index === selectedPlan ? null : index);
  };

  const handleChoosePlan = (plan) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/payment", { state: { plan, platform } });
    } else {
      navigate("/login");
    }
  };

  const handleCustomizedPlan = (type) => {
    console.log(type);
    navigate("/customized-plan", {
      state: { platform, type },
    });
  };

  const filteredPlans = subscriptionPlans.filter(
    (plan) => plan.planType === (isYearly ? "yearly" : "monthly")
  );

  return (
    <div className="plans-container">
      <h1>Choose Your Plan</h1>
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${!isYearly ? "active" : ""}`}
          onClick={() => handleToggle("monthly")}
        >
          Monthly
        </button>
        <button
          className={`toggle-btn ${isYearly ? "active" : ""}`}
          onClick={() => handleToggle("yearly")}
        >
          Yearly
        </button>
      </div>

      <h2>Best Plans For {platform} Subscription</h2>

      <div className="plans">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan, index) => (
            <div
              className={`plan-card ${
                selectedPlan === index ? "selected" : ""
              }`}
              key={plan._id}
              onClick={() => handleSelectPlan(index)}
            >
              <div className="plan-content">
                <h3>{plan.planName}</h3>
                <p className="price">£{plan.price}</p>
                <p className="time">{isYearly ? "user/year" : "user/month"}</p>

                <ul className="features-list">
                  <li className={plan.platform === "Tiktok Live" ? "na" : ""}>
                    Likes:{" "}
                    {plan.platform === "Tiktok Live" ? "N/A" : plan.likes}
                  </li>
                  <li className={plan.platform === "Tiktok Live" ? "na" : ""}>
                    Comments:{" "}
                    {plan.platform === "Tiktok Live" ? "N/A" : plan.comments}
                  </li>
                  <li className={plan.platform === "Tiktok Live" ? "na" : ""}>
                    Followers:{" "}
                    {plan.platform === "Tiktok Live" ? "N/A" : plan.followers}
                  </li>
                  <li
                    className={
                      plan.live_audience === null || plan.live_audience === 0
                        ? "na"
                        : ""
                    }
                  >
                    Live Audience:{" "}
                    {plan.live_audience !== null && plan.live_audience !== 0
                      ? plan.live_audience
                      : "N/A"}
                  </li>
                </ul>

                <a href="#" className="try-free-link">
                  Try Free 10 Likes
                </a>
                <div className="button-container">
                  <button
                    className="choose-plan"
                    onClick={() => handleChoosePlan(plan)}
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading plans...</p>
        )}
      </div>

      <button
        className="customized-plan"
        onClick={() => handleCustomizedPlan("Customized")}
      >
        Customized Plan
      </button>
    </div>
  );
};

export default SubPlans;
