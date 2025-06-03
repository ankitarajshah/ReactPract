import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROLES } from "../../context/AuthContext";
// const PrivateRoute = () => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
// };

// export default PrivateRoute;
const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, getUserRoles } = useAuth();
  const roles = getUserRoles();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/signin?redirectTo=${location.pathname}`} replace />;
  }

  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  const hasAccess = allowedRoles.some((role) => roles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/403" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
