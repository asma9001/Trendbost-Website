import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UDash.css";
import pic from "./pic.png";
import Divider from "./Vector 131.png";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosPrint } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { BiPurchaseTag } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import DashboardGraphs from "./DashboardGraphs";
import PayMethd from "./PayMethd";
import { useAuth } from "../../context/auth";
import { MdOutlineLiveTv } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import axiosInstance from "../../axiosInstance.js";

const UDash = ({ platform }) => {
  const [auth, setAuth] = useAuth();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [getUserOrder, setGetUserOrder] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [file, setFile] = useState(pic);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getUserOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/userOrderDetails/${userId}`);
       
        setGetUserOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    };
    getUserOrderDetails();
  }, [userId]);

  useEffect(() => {
    const getPurchaseHistory = async () => {
      try {
        const response = await axiosInstance.get(`/userSubscribe/${userId}`);
  
        setPurchaseHistory(response.data);
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    };
    getPurchaseHistory();
  }, [userId]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosInstance.get(
          `/userProfileSettings/${userId}`
        );
        setUserInfo(response.data.user);
      } catch (error) {
        console.error("Error fetching payment methods", error);
      }
    };
    getUserInfo();
  }, [userId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMenuClick = async (menuItem, platform) => {
    setActiveMenu(menuItem);
    setDropdownOpen(false);
    if (
      ["TikTok", "Tiktok Live", "Facebook", "Instagram", "Twitter"].includes(
        menuItem
      )
    ) {
      try {
        const response = await axiosInstance.get(
          `/subscriptionPlans/${platform}`
        );
       
        setSubscriptionPlans(response.data);
        setFilteredPlans(
          response.data.filter((plan) => plan.planType === "monthly")
        );
      } catch (error) {
        toast.error("Error fetching plans");
      }
    }
  };

  const handleToggle = (type) => {
    setIsYearly(type === "yearly");
    setFilteredPlans(
      subscriptionPlans.filter((plan) => plan.planType === type)
    );
  };

  const handleSelectPlan = (index) => {
    setSelectedPlan(index === selectedPlan ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", userInfo.firstName);
      formData.append("lastName", userInfo.lastName);
      formData.append("email", userInfo.email);
      formData.append("phoneNo", userInfo.phoneNo);

      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }
        formData.append("password", password);
      }

      if (file && file !== pic) {
        formData.append("image", file);
      }

      const response = await axiosInstance.put(
        `http://localhost:5000/api/userProfileSettings/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setUserInfo((prevUser) => ({
          ...prevUser,
          picture:
            file && file !== pic ? URL.createObjectURL(file) : prevUser.picture,
        }));
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  };

  const handleLogout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const navigateToCustomizedPlan = (type, platform) => {
    if (platform) {
      navigate("/customized-plan", { state: { platform, type } });
    } else {
      alert("Platform name is missing!");
    }
  };

  const handleChoosePlan = (plan, platform) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/payment", { state: { plan, platform } });
    } else {
      navigate("/login");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderPlansContent = (platform) => (
    <div className="udash-plans-container">
      <h1>Choose Your Plan</h1>
      <div className="udash-toggle-buttons">
        <button
          className={`udash-toggle-btn ${!isYearly ? "active" : ""}`}
          onClick={() => handleToggle("monthly")}
        >
          Monthly
        </button>
        <button
          className={`udash-toggle-btn ${isYearly ? "active" : ""}`}
          onClick={() => handleToggle("yearly")}
        >
          Yearly
        </button>
      </div>
      <h2>Best Plans For {platform || "Your Platform"} Subscription</h2>
      <div className="udash-plans">
        {filteredPlans &&
          filteredPlans.map((plan, index) => (
            <div
              className={`udash-plan-card ${
                selectedPlan === index ? "selected" : ""
              }`}
              key={index}
              onClick={() => handleSelectPlan(index)}
            >
              <div className="udash-plan-content">
                <h3>{plan.planName}</h3>
                <p className="udash-price">
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </p>
                <p className="udash-time">
                  {isYearly ? "user/year" : "user/month"}
                </p>
                <ul className="udash-features-list">
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
                <a href="#" className="udash-try-free-link">
                  Try Free 10 Likes
                </a>
                <div className="udash-button-container">
                  <button
                    className="udash-choose-plan"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent div's onClick
                      handleChoosePlan(plan, platform);
                    }}
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        className="udash-customized-plan"
        onClick={() => navigateToCustomizedPlan("Customized", platform)}
      >
        Customized Plan
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <DashboardGraphs />;
      case "Orders":
        return (
          <div className="order-table">
            <h3 className="order-head">Order Details</h3>
            <table className="order-details-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Platform</th>
                  <th>Subscription</th>
                  <th>Payment Method</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {getUserOrder.map((order, index) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.platform_Name}</td>
                    <td>{order.planName}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Buy":
        return <div>Buy Content</div>;
      case "TikTok":
      case "Tiktok Live":
      case "Facebook":
      case "Instagram":
      case "Twitter":
        return renderPlansContent(activeMenu);
      case "Payment Method":
        return <PayMethd />;
      case "Purchase History":
        return (
          <div className="purch-history-container">
            <h3 className="purch-history-heading">Purchase History</h3>
            <div className="scrollable-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>Package Name</th>
                    <th>Starting Date</th>
                    <th>Ending Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((plan, index) => (
                    <tr key={index}>
                      <td>{plan.subscriptionId.platform}</td>
                      <td>{plan.subscriptionId.planName}</td>
                      <td>{formatDate(plan.startDate)}</td>
                      <td>{formatDate(plan.endDate)}</td>
                      <td>${plan.subscriptionId.price}</td>
                      <td>{plan.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination-container">
              <div className="who-per-page">Who per page: 5</div>
              <div className="pagination-buttons">
                <button className="pagination-btn">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">3</button>
                <button className="pagination-btn">4</button>
              </div>
            </div>
          </div>
        );
      case "Edit Profile":
        return (
          <div className="main-container">
            <div className="prof-container">
              <h2 className="prof-heading">Profile Settings</h2>
              <form onSubmit={handleSubmit} className="prof-form">
                <div className="prof-form-row">
                  <div className="prof-form-group half-width">
                    <input
                      type="text"
                      value={userInfo.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="First Name"
                    />
                  </div>
                  <div className="prof-form-group half-width">
                    <input
                      type="text"
                      value={userInfo.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="prof-form-row">
                  <div className="prof-form-group">
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled
                      placeholder="Email"
                    />
                  </div>
                  <div className="prof-form-group">
                    <input
                      type="tel"
                      value={userInfo.phoneNo}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone"
                    />
                  </div>
                </div>
                <div className="prof-form-row">
                  <div className="prof-form-group">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New Password"
                    />
                  </div>
                  <div className="prof-form-group">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
                <div className="prof-form-row prof-form-group">
                  <input
                    type="file"
                    id="profilePic"
                    onChange={handleFileChange}
                    placeholder="Profile Picture"
                    style={{ marginLeft: "10px" }} // Add some margin to space the input
                  />
                </div>
                <div className="dash-button-container">
                  <button type="submit" className="dash-update-button">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="main-dashboard-container">
      <div className="dashboard-container">
        <div className="sidebar">
          <div>
            <div className="user-info">
              <img
                src={userInfo.image || file}
                alt="User"
                className="user-avatar"
              />
              <div className="user-details">
                <h5>{`${userInfo.firstName} ${userInfo.lastName}`}</h5>
                <p>Dashboard</p>
              </div>
            </div>
            <div>
              <img src={Divider} alt="" className="dash-divider" />
            </div>
            <ul className="menu">
              <p style={{ paddingLeft: "13px" }}>Quick Access</p>
              <li
                className={activeMenu === "Dashboard" ? "active" : ""}
                onClick={() => setActiveMenu("Dashboard")}
              >
                <AiOutlineDashboard className="dash-icons" />
                Dashboard
              </li>
              <li
                className={activeMenu === "Orders" ? "active" : ""}
                onClick={() => setActiveMenu("Orders")}
              >
                <IoIosPrint className="dash-icons" />
                Orders
              </li>
              <li
                className={`menu-button ${
                  ["TikTok", "Facebook", "Instagram", "Twitter"].includes(
                    activeMenu
                  )
                    ? "active"
                    : ""
                }`}
              >
                <div className="dropdown-custom">
                  <BiPurchaseTag className="dash-icons" />
                  <span className="buy-drop">Buy</span>
                  <span className="dash-arrow-icon">
                    <IoIosArrowDown className="dash-icons" />
                  </span>
                </div>
                <ul className="custom-dropdown-menu">
                  <li onClick={() => handleMenuClick("TikTok", "TikTok")}>
                    <AiFillTikTok className="drop-icon" />
                    TikTok
                  </li>
                  <li
                    onClick={() =>
                      handleMenuClick("Tiktok Live", "Tiktok Live")
                    }
                  >
                    <MdOutlineLiveTv className="drop-icon" />
                    TikTok Live
                  </li>
                  <li onClick={() => handleMenuClick("Facebook", "Facebook")}>
                    <FaFacebook className="drop-icon" />
                    Facebook
                  </li>
                  <li onClick={() => handleMenuClick("Instagram", "Instagram")}>
                    <AiOutlineInstagram className="drop-icon" />
                    Instagram
                  </li>
                  <li onClick={() => handleMenuClick("Twitter", "Twitter")}>
                    <FaTwitterSquare className="drop-icon" />
                    Twitter
                  </li>
                </ul>
              </li>
              <li
                className={activeMenu === "Payment Method" ? "active" : ""}
                onClick={() => setActiveMenu("Payment Method")}
              >
                <MdPayment className="dash-icons" />
                Payment Method
              </li>
              <li
                className={activeMenu === "Purchase History" ? "active" : ""}
                onClick={() => setActiveMenu("Purchase History")}
              >
                <MdOutlineHistory className="dash-icons" />
                Purchase History
              </li>
              <li
                className={activeMenu === "Edit Profile" ? "active" : ""}
                onClick={() => setActiveMenu("Edit Profile")}
              >
                <CgProfile className="dash-icons" />
                Edit Profile
              </li>
            </ul>
          </div>
          <li className="logout-button" onClick={handleLogout}>
            <IoLogOutOutline className="dash-icons" />
            Logout
          </li>
        </div>
        <div className="main-content">
          <header className="header">
            <h5 className="header-content">
              The Secret Weapon for Social Growth is Trendbost
            </h5>
            <div className="notifications">
              <span className="notification-icon">
                <IoNotifications />
              </span>
            </div>
          </header>
          <div className="content-container">{renderContent()}</div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UDash;
