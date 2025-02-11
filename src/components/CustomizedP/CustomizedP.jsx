import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CustomizedP.css";
import { RiUserFollowLine } from "react-icons/ri";
import axiosInstance from "../../axiosInstance.js";
import toast from "react-hot-toast";
import axios from "axios";
const CustomizedP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [getCustomizePlans, setGetCustomizePlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [likes, setLikes] = useState(0);
  const [reactions, setReactions] = useState(0);
  const [comments, setComments] = useState(0);
  const [liveAudience, setLiveAudience] = useState(0);
  const [isYearly, setIsYearly] = useState(false);

  const { platform, type } = location.state;
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get(
          `/customizedPlan/platform/${platform}`
        );
        setGetCustomizePlans(response.data);
        setFilteredPlans(
          response.data.filter((plan) => plan.planType === "monthly")
        );
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
    const filtered = getCustomizePlans.filter((plan) => plan.planType === type);
    console.log(filtered);
    setFilteredPlans(filtered);
  };

  const handleGenerateClick = async () => {
    if (
      (platform === "TikTok Live" && liveAudience === 0) ||
      (platform !== "TikTok Live" &&
        (likes === 0 || comments === 0 || reactions === 0))
    ) {
      toast.error("Please select values for likes, comments, and followers");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/customSubscription/",
        {
          userId: userId,
          platform,
          planType: isYearly ? "yearly" : "monthly",

          likes,
          comments,
          followers: reactions,
          live_audience: liveAudience,
        }
      );

      const { data } = response;

      navigate("/payment", {
        state: {
          orderId: data._id,
          platform,
          subscriptionModel: "CustomSubscriptionPlan",
          type,
          likes,
          filteredPlans,
          comments,
          followers: reactions,
          liveAudience,
          totalAmount: data.totalAmount,
        },
      });
    } catch (error) {
      toast.error("Error generating custom plan order");
    }
  };

  return (
    <div className="custom">
      <div className="customized-plan-head">
        <h1>Choose Your Plan</h1>
        <div className="toggle-button">
          <button
            className={`toggle-btnn ${!isYearly ? "active" : ""}`}
            onClick={() => handleToggle("monthly")}
          >
            Monthly
          </button>
          <button
            className={`toggle-btnn ${isYearly ? "active" : ""}`}
            onClick={() => handleToggle("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="customized-plans-container">
        <h2>
          Customized Plans For{" "}
          {platform || <span style={{ color: "red" }}>[Platform Missing]</span>}{" "}
          Subscription
        </h2>

        {platform === "TikTok Live" ? (
          <div className="custpay-input-container">
            <label className="custp-label">📺 Live Audience</label>
            <input
              type="number"
              value={liveAudience}
              onChange={(e) => setLiveAudience(Number(e.target.value))}
              min="0"
              className="custp-input"
            />
          </div>
        ) : (
          <>
            <div className="custpay-input-container">
              <label className="custp-label">👍 Likes</label>
              <input
                type="number"
                value={likes}
                onChange={(e) => setLikes(Number(e.target.value))}
                min="0"
                className="custp-input"
              />
            </div>
            <div className="custpay-input-container">
              <label className="custp-label">💬 Comments</label>
              <input
                type="number"
                value={comments}
                onChange={(e) => setComments(Number(e.target.value))}
                min="0"
                className="custp-input"
              />
            </div>
            <div className="custpay-input-container">
              <label className="custp-label">
                <RiUserFollowLine className="follower-icon" />
                Follower
              </label>
              <input
                type="number"
                value={reactions}
                onChange={(e) => setReactions(Number(e.target.value))}
                min="0"
                className="custp-input"
              />
            </div>
          </>
        )}

        <button className="generate-button" onClick={handleGenerateClick}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default CustomizedP;
