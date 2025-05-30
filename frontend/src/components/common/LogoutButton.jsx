// src/components/common/LogoutButton.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import CustomButton from "./CustomButton";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <CustomButton onClick={logout} variant="danger">
      Logout
    </CustomButton>
  );
};

export default LogoutButton;
