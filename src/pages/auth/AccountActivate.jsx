import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
// import "../.././style.css";

const AccountActivate = () => {
  /* context */
  const [auth, setAuth] = useAuth();

  /* useParams hook */  
  const { token } = useParams();
  const navigate = useNavigate();

  /* useEffect hook */
  useEffect(() => {
    if (token) requestForActivation();
  }, [token]);

  const requestForActivation = async () => {
    try {
      const { data } = await axios.post('/signup', { token });

      if (data?.error) { // "data && data.error"
        toast.error(data.error);
      } else {
        /* save in local storage */
        localStorage.setItem("auth", JSON.stringify(data));  
        /* save in context */
        setAuth(data);
        toast.success("Account Created, You are successfully logged in. Welcome to Trendbost.com");
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      toast.error("Activation failed….Something went wrong…Try again");
    }
  };

  return (
    <div className="account-activate">
      <div className="title"> Account Activation... </div>
      <br /><br /><br /><br />
      <div className="loading-bar">Loading</div>
    </div>
  );
};

export default AccountActivate;
