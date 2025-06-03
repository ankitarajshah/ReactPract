import { createContext, useContext, useEffect, useState } from "react";
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  SUPER_ADMIN: "superAdmin",
  MANAGER: "manager",
};
const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  hasRole: () => false,
  getUserRoles: () => [],
});
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedData && storedToken) {
      setUser(JSON.parse(storedData));
      setToken(storedToken);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token || ""); // save token if present

    setUser(data);
    setToken(data.token || "");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };
  const hasRole = (role) => {
    const roles = getUserRoles();
    return Array.isArray(role)
      ? role.some((r) => roles.includes(r))
      : roles.includes(role);
  };

  const getUserRoles = () =>
    user?.role ? (Array.isArray(user.role) ? user.role : [user.role]) : [];

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        hasRole,
        getUserRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
