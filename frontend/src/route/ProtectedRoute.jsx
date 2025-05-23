import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
