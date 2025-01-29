import React, { useState, useEffect } from "react";
import {
  FaThumbsUp,
  FaComment,
  FaUsers,
  FaArrowLeft,
  FaUserFriends,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axiosInstance from "../../axiosInstance.js";

const DashboardGraphs = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [userData, setUserData] = useState({
    Facebook: {
      likes: 0,
      comments: 0,
      followers: 0,
      planName: "Not Subscribed",
    },
    Tiktok: { likes: 0, comments: 0, followers: 0, planName: "Not Subscribed" },
    Instagram: {
      likes: 0,
      comments: 0,
      followers: 0,
      planName: "Not Subscribed",
    },
    Twitter: {
      likes: 0,
      comments: 0,
      followers: 0,
      planName: "Not Subscribed",
    },
    "Tiktok Live": { liveAudience: 0, planName: "Not Subscribed" },
  });
  const [inputData, setInputData] = useState({
    likes: 0,
    comments: 0,
    followers: 0,
    liveAudience: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);
  const [urlInput, setUrlInput] = useState({
    profileLink: "",
    postLink: "",
    liveLink: "",
  });
  const [subscription, setSubscription] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getUserSubscription = async () => {
      try {
        const response = await axiosInstance.get(`/userSubscribe/${userId}`);
        setSubscription(response.data);
        console.log("Fetched subscription data:", response.data); // Debugging statement
      } catch (error) {
        console.error("Error fetching subscription data", error);
      }
    };

    getUserSubscription();
  }, [userId]);
  console.log(subscription);
  useEffect(() => {
    const updatedUserData = {
      Facebook: {
        likes: 0,
        comments: 0,
        followers: 0,
        planName: "Not Subscribed",
      },
      Tiktok: {
        likes: 0,
        comments: 0,
        followers: 0,
        planName: "Not Subscribed",
      },
      Instagram: {
        likes: 0,
        comments: 0,
        followers: 0,
        planName: "Not Subscribed",
      },
      Twitter: {
        likes: 0,
        comments: 0,
        followers: 0,
        planName: "Not Subscribed",
      },
      "Tiktok Live": { liveAudience: 0, planName: "Not Subscribed" },
    };

    subscription.forEach((sub) => {
      const subscriptionId = sub.subscriptionId;
      if (!subscriptionId) {
        return; // Skip if subscriptionId is null or undefined
      }
      const { platform, likes, comments, followers, live_audience, planName } =
        subscriptionId;
      const {
        consumedLikes,
        consumedComments,
        consumedFollowers,
        consumedAudience,
      } = sub;

      if (sub.status === "Active" && updatedUserData[platform]) {
        if (platform === "Tiktok Live") {
          updatedUserData[platform] = {
            liveAudience: consumedAudience || 0,
            planName: planName,
          };
        } else {
          updatedUserData[platform] = {
            likes: consumedLikes,
            comments: consumedComments,
            followers: consumedFollowers,
            planName: planName,
          };
        }
      }
    });

    setUserData(updatedUserData);
    console.log("Updated user data:", updatedUserData); // Debugging statement
  }, [subscription]);

  const handleDetailClick = (platform) => {
    setSelectedPlatform(platform);
    const platformData = userData[platform];
    if (platform === "Tiktok Live") {
      setInputData({
        liveAudience: platformData.liveAudience || 0,
      });
    } else {
      setInputData({
        likes: platformData.likes,
        comments: platformData.comments,
        followers: platformData.followers,
      });
    }
  };

  const getColorStyle = (value, maxValue) => {
    if (value === 0 && maxValue === 0) {
      return {
        pathColor: "#d6d6d6",
        textColor: "#4A4A4A",
      };
    } else if (value === maxValue) {
      return {
        pathColor: "rgb(105, 56, 243)",
        textColor: "rgb(105, 56, 243)",
      };
    } else {
      return {
        pathColor: `rgba(105, 56, 243, 0.4), ${value / maxValue})`,
        textColor: "#4A4A4A",
      };
    }
  };

  const handleBackClick = () => {
    setShowForm(false);
    setSelectedPlatform(null);
    setFormType(null);
  };

  const handleInputChange = (type, value) => {
    setInputData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleApply = (type) => {
    const platform = selectedPlatform;
    const newValue = inputData[type];
    const totalValue = userData[platform][type] + newValue;

    const limits = subscription.reduce((acc, plan) => {
      if (plan.subscriptionId) {
        acc[plan.subscriptionId.platform] = {
          likes: plan.subscriptionId.likes,
          comments: plan.subscriptionId.comments,
          followers: plan.subscriptionId.followers,
          live_audience: plan.subscriptionId.live_audience || 0,
        };
      }
      return acc;
    }, {});

    const platformLimits = limits[platform];

    if (totalValue > platformLimits[type]) {
      toast.error(
        `Please upgrade your plan to exceed the limit of ${platformLimits[type]} ${type}`
      );
      return;
    }

    setFormType(type);
    setShowForm(true);
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setUrlInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProceed = async () => {
    const platform = selectedPlatform;
    const newValue = inputData[formType];

    try {
      const subscriptionData = subscription.find(
        (sub) => sub.subscriptionId && sub.subscriptionId.platform === platform
      );

      const payload = {
        userId: localStorage.getItem("userId"),
        subscriptionId: subscriptionData?.subscriptionId._id,
        consumedLikes: formType === "likes" ? newValue : 0,
        consumedComments: formType === "comments" ? newValue : 0,
        consumedFollowers: formType === "followers" ? newValue : 0,
        consumedAudience: formType === "liveAudience" ? newValue : 0,
        postLink:
          formType === "liveAudience" ? urlInput.liveLink : urlInput.postLink,
      };

      console.log("Payload:", payload);

      await axiosInstance.post("/subscriptionConsumption/", payload);

      toast.success(
        `Successfully updated ${formType} consumption for ${platform}`
      );

      // Update userData state after successful API call
      setUserData((prevState) => ({
        ...prevState,
        [platform]: {
          ...prevState[platform],
          [formType]: prevState[platform][formType] + newValue,
        },
      }));

      setShowForm(false);
      setFormType(null);
    } catch (error) {
      toast.error(
        `Failed to update ${formType} consumption for ${platform}: ${error.message}`
      );
    }
  };
  const chartStyle = {
    width: "100px",
    height: "100px",
    margin: "10px auto",
  };

  return (
    <div className="dashboard-graphs">
      <Toaster />
      <div
        className={`dashboard-graphs-cards ${selectedPlatform ? "hidden" : ""}`}
      >
        {Object.keys(userData).map((platform) => {
          const platformData = userData[platform];
          if (!platformData) {
            return null; // Skip rendering if platformData is undefined
          }

          const platformSubscription = subscription.find(
            (sub) =>
              sub.subscriptionId &&
              sub.subscriptionId.platform === platform &&
              sub.status === "Active"
          );
          console.log(platformSubscription);
          const totalLikes = platformSubscription
            ? platformSubscription.subscriptionId.likes
            : 0;
          const totalComments = platformSubscription
            ? platformSubscription.subscriptionId.comments
            : 0;
          const totalFollowers = platformSubscription
            ? platformSubscription.subscriptionId.followers
            : 0;
          const totalAudience = platformSubscription
            ? platformSubscription.subscriptionId.live_audience || 0
            : 0;

          const consumedLikes = platformSubscription
            ? platformSubscription.consumedLikes
            : 0;
          const consumedComments = platformSubscription
            ? platformSubscription.consumedComments
            : 0;
          const consumedFollowers = platformSubscription
            ? platformSubscription.consumedFollowers
            : 0;
          const consumedAudience = platformSubscription
            ? platformSubscription.consumedAudience
            : 0;

          const planName = platformSubscription
            ? platformSubscription.subscriptionId.planName
            : "Not Subscribed";

          return (
            <div
              className={`dashboard-graphs-card ${
                platform === "Tiktok" ? "dashboard-graphs-card-tiktok" : ""
              }`}
              key={platform}
            >
              <div className="dashboard-graphs-card-header">
                <h3 className="dashboard-graphs-chart-head">
                  {platform} Status{" "}
                  <span className="dashboard-graphs-head-stats">
                    ({planName})
                  </span>
                </h3>
                <div className="dashboard-graphs-menu">
                  <span className="dashboard-graphs-three-dots">
                    &#8226;&#8226;&#8226;
                  </span>
                  <div className="dashboard-graphs-menu-content">
                    <button
                      className="dashboard-graphs-detail-button"
                      onClick={() => handleDetailClick(platform)}
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
              <div className="dashboard-graphs-chart-container">
                {platform !== "Tiktok Live" && (
                  <>
                    <div
                      className="dashboard-graphs-pie-chart"
                      style={chartStyle}
                    >
                      <CircularProgressbar
                        value={consumedLikes}
                        maxValue={totalLikes}
                        text={`${consumedLikes}/${totalLikes}`}
                        strokeWidth={20}
                        styles={buildStyles(
                          getColorStyle(consumedLikes, totalLikes)
                        )}
                      />
                      <p className="dashboard-graphs-chart-label">Likes</p>
                    </div>
                    <div
                      className="dashboard-graphs-pie-chart"
                      style={chartStyle}
                    >
                      <CircularProgressbar
                        value={consumedComments}
                        maxValue={totalComments}
                        text={`${consumedComments}/${totalComments}`}
                        strokeWidth={20}
                        styles={buildStyles(
                          getColorStyle(consumedComments, totalComments)
                        )}
                      />
                      <p className="dashboard-graphs-chart-label">Comments</p>
                    </div>
                    <div
                      className="dashboard-graphs-pie-chart"
                      style={chartStyle}
                    >
                      <CircularProgressbar
                        value={consumedFollowers}
                        maxValue={totalFollowers}
                        text={`${consumedFollowers}/${totalFollowers}`}
                        strokeWidth={20}
                        styles={buildStyles(
                          getColorStyle(consumedFollowers, totalFollowers)
                        )}
                      />
                      <p className="dashboard-graphs-chart-label">Followers</p>
                    </div>
                  </>
                )}
                {platform === "Tiktok Live" && (
                  <div
                    className="dashboard-graphs-pie-chart"
                    style={chartStyle}
                  >
                    <CircularProgressbar
                      value={consumedAudience}
                      maxValue={totalAudience}
                      text={`${consumedAudience}/${totalAudience}`}
                      strokeWidth={20}
                      styles={buildStyles(
                        getColorStyle(consumedAudience, totalAudience)
                      )}
                    />
                    <p className="dashboard-graphs-chart-label">
                      Live Audience
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedPlatform && !showForm && renderDetail()}
      {showForm && (
        <div className="dashboard-graphs-detail show-form">
          <div className="dashboard-graphs-detail-header">
            <FaArrowLeft
              className="dashboard-graphs-back-button"
              onClick={handleBackClick}
            />
            <h3 className="dashboard-graphs-detail-heading">
              {formType === "liveAudience"
                ? "Add TikTok Live Link"
                : "Add Links"}
            </h3>
          </div>
          <div className="addlink-form-row">
            {formType === "liveAudience" ? (
              <div className="addlink-form-group">
                <input
                  type="text"
                  name="liveLink"
                  value={urlInput.liveLink}
                  placeholder="Add Live Link"
                  onChange={handleUrlChange}
                />
              </div>
            ) : (
              <>
                <div className="addlink-form-group">
                  <input
                    type="text"
                    name="profileLink"
                    value={urlInput.profileLink}
                    placeholder="Add Profile Link"
                    onChange={handleUrlChange}
                  />
                </div>
                <div className="addlink-form-group">
                  <input
                    type="text"
                    name="postLink"
                    value={urlInput.postLink}
                    placeholder="Add Post Link"
                    onChange={handleUrlChange}
                  />
                </div>
              </>
            )}
          </div>
          <div className="button-container">
            <button className="proceed-button" onClick={handleProceed}>
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );

  function renderDetail() {
    if (!selectedPlatform) return null;

    const platformData = userData[selectedPlatform];

    const platformSubscription = subscription.find(
      (sub) =>
        sub.subscriptionId &&
        sub.subscriptionId.platform === selectedPlatform &&
        sub.status === "Active"
    );

    if (!platformSubscription) {
      return <div>No subscription data available</div>;
    }

    const totalLikes = platformSubscription.subscriptionId.likes || 0;
    const totalComments = platformSubscription.subscriptionId.comments || 0;
    const totalFollowers = platformSubscription.subscriptionId.followers || 0;

    const totalAudience =
      selectedPlatform === "Tiktok Live" && platformSubscription
        ? platformSubscription.subscriptionId.live_audience || 0
        : 0;

    return (
      <div className="dashboard-graphs-detail">
        <div className="dashboard-graphs-detail-header">
          <FaArrowLeft
            className="dashboard-graphs-back-button"
            onClick={handleBackClick}
          />
          <h3 className="dashboard-graphs-detail-heading">
            {selectedPlatform} Details
          </h3>
        </div>
        <div className="dashboard-graphs-detail-container">
          {selectedPlatform !== "Tiktok Live" && (
            <>
              <div className="dashboard-graphs-detail-item">
                <FaThumbsUp className="dashboard-graphs-detail-icon" />
                <div className="dashboard-graphs-detail-content">
                  <p className="dashboard-graphs-chart-label-2">Likes</p>
                  <input
                    type="number"
                    value={inputData.likes}
                    onChange={(e) =>
                      handleInputChange("likes", parseInt(e.target.value))
                    }
                    max={totalLikes}
                  />
                  <button
                    className="dashboard-graphs-apply-button"
                    onClick={() => handleApply("likes")}
                    disabled={
                      inputData.likes === userData[selectedPlatform].likes
                    }
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="dashboard-graphs-detail-item">
                <FaComment className="dashboard-graphs-detail-icon" />
                <div className="dashboard-graphs-detail-content">
                  <p className="dashboard-graphs-chart-label-2">Comments</p>
                  <input
                    type="number"
                    value={inputData.comments}
                    onChange={(e) =>
                      handleInputChange("comments", parseInt(e.target.value))
                    }
                    max={totalComments}
                  />
                  <button
                    className="dashboard-graphs-apply-button"
                    onClick={() => handleApply("comments")}
                    disabled={
                      inputData.comments === userData[selectedPlatform].comments
                    }
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="dashboard-graphs-detail-item">
                <FaUsers className="dashboard-graphs-detail-icon" />
                <div className="dashboard-graphs-detail-content">
                  <p className="dashboard-graphs-chart-label-2">Followers</p>
                  <input
                    type="number"
                    value={inputData.followers}
                    onChange={(e) =>
                      handleInputChange("followers", parseInt(e.target.value))
                    }
                    max={totalFollowers}
                  />
                  <button
                    className="dashboard-graphs-apply-button"
                    onClick={() => handleApply("followers")}
                    disabled={
                      inputData.followers ===
                      userData[selectedPlatform].followers
                    }
                  >
                    Apply
                  </button>
                </div>
              </div>
            </>
          )}
          {selectedPlatform === "Tiktok Live" && (
            <div className="dashboard-graphs-detail-item">
              <FaUserFriends className="dashboard-graphs-detail-icon" />
              <div className="dashboard-graphs-detail-content">
                <p className="dashboard-graphs-chart-label-2">Live Audience</p>
                <input
                  type="number"
                  value={inputData.liveAudience}
                  onChange={(e) =>
                    handleInputChange("liveAudience", parseInt(e.target.value))
                  }
                  max={totalAudience}
                />
                <button
                  className="dashboard-graphs-apply-button"
                  onClick={() => handleApply("liveAudience")}
                  disabled={
                    inputData.liveAudience ===
                    userData[selectedPlatform].liveAudience
                  }
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default DashboardGraphs;
