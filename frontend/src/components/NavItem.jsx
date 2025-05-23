import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ to, icon: Icon, children, highlight = false, badge }) => {
  return (
    <>
      <Link
        to={to}
        className={`flex items-center hover:text-orange-500 ${
          highlight ? "text-orange-600 font-semibold" : ""
        }`}
      >
        {Icon && <Icon className="w-4 h-4 mr-1" />}
        {children}
        {badge && (
          <span className="ml-1 text-xs bg-red-500 text-white rounded px-1">
            {badge}
          </span>
        )}
      </Link>
    </>
  );
};

export default NavItem;
