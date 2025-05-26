import React from "react";
import { Link } from "react-router-dom";
import { filterByRole } from "../../utils/filterByRole";
import { User } from "lucide-react";
const Navbar = ({ items, roles, onProfileClick }) => {
  const filteredItems = filterByRole(items, roles);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-3 flex items-center justify-between">

      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8" />
        <span className="text-xl font-bold text-orange-500">Swiggy</span>
      </Link>
      <button onClick={onProfileClick}>
        <User className="w-6 h-6 text-gray-800" />
      </button>
     
      <nav className="flex space-x-6 items-center">
        {filteredItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 hover:text-orange-500 ${
              item.highlight ? "text-orange-600 font-semibold" : ""
            }`}
          >
            {item.icon && <item.icon className="w-4 h-4" />}
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-1 text-xs bg-red-500 text-white rounded px-1">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>{" "}
    </header>
  );
};

export default Navbar;
