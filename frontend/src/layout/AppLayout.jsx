// src/AppLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import {
  Home,
  ShoppingCart,
  HelpCircle,
  Percent,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import Footer from "../pages/Footer";

const userRoles = ["user"];

const AppLayout = () => {
  const [sidebarLeftOpen, setSidebarLeftOpen] = useState(false);
  const [sidebarRightOpen, setSidebarRightOpen] = useState(false);

  const navBarItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/restaurant", label: "Restaurant" },
    { to: "/other", label: "Other" },
    { to: "/help", label: "Help", icon: HelpCircle },
    { to: "/offers", label: "Offers", icon: Percent, badge: "NEW" },
    { to: "/signin", label: "Sign In" },
  ];

  const rightNavItems = [
    { to: "/cart", label: "Cart", icon: ShoppingCart, roles: ["user"] },
    { to: "/profile", label: "Profile", icon: User, roles: ["user", "admin"] },
    { to: "/logout", label: "Logout", icon: LogOut, roles: ["user", "admin"] },
  ];

  return (
    <>
      {/* Overlay for mobile when either sidebar is open */}
      {(sidebarLeftOpen || sidebarRightOpen) && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 "
          onClick={() => {
            setSidebarLeftOpen(false);
            setSidebarRightOpen(false);
          }}
        />
      )}

      {/* Navbar: Visible on all screens */}
      <Navbar
        items={navBarItems}
        roles={userRoles}
        onProfileClick={() => {
          console.log("User icon clicked");
          setSidebarRightOpen((prev) => !prev);
        }}
      />

      {/* Left Sidebar toggle button: Visible on mobile only */}
      <button
        onClick={() => setSidebarLeftOpen((prev) => !prev)}
        className="fixed top-3 left-4 z-50 "
        aria-label="Toggle Left Sidebar"
      >
        {sidebarLeftOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Left Sidebar */}
      <SidebarLeft
        items={navBarItems}
        roles={userRoles}
        sidebarLeftOpen={sidebarLeftOpen}
        setSidebarLeftOpen={setSidebarLeftOpen}
      />

      {/* Right Sidebar */}
      <SidebarRight
        items={rightNavItems}
        roles={userRoles}
        sidebarRightOpen={sidebarRightOpen}
        setSidebarRightOpen={setSidebarRightOpen}
      />

      {/* Main Content */}
      <main className="pt-16 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default AppLayout;
