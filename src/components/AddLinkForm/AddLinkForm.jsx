import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddLinkForm.css";

const AddLinkForm = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/checkout-page");
  };

  return (
    <div className="main-container">
      <div className="addlink-container">
        <h2 className="addlink-heading">Add Links</h2>
        {/* Additional Input Fields */}
        <div className="addlink-form-row">
          <div className="addlink-form-group">
            <input type="text" placeholder="Add Profile Link" />
          </div>
          <div className="addlink-form-group">
            <input type="text" placeholder="Add Post Link" />
          </div>
        </div>
        {/* Proceed Button */}
        <div className="button-container">
          <button className="proceed-button" onClick={handleProceed}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLinkForm;

