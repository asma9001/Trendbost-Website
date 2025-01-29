import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from '../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

function PrivateRoute({ requiredRole }) {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) {
      fetchCurrentUser();
    } else {
      setOk(false);
      setLoading(false);
    }
  }, [auth?.token]);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get("/loggedIn-user", {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (requiredRole && data.role !== requiredRole) {
        toast.error("You do not have the required permissions to access this page.");
        setOk(false);
      } else {
        setOk(true);
      }
    } catch (err) {
      toast.error("Authentication failed. Please log in again.");
      setOk(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!auth?.token) {
    toast.error("Please login first");
    return <Navigate to='/login' />;
  }

  return ok ? <Outlet /> : <Navigate to='/unauthorized' />;
}

export default PrivateRoute;
