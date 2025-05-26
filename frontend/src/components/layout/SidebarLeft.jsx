import React from "react";
import { Link } from "react-router-dom";
import { filterByRole } from "../../utils/filterByRole";

const SidebarLeft = ({ items, roles, sidebarLeftOpen, setSidebarLeftOpen }) => {
  const filteredItems = filterByRole(items, roles);

  return (
    <aside
      className={`bg-gray-100 shadow-md z-30 w-48 h-full transition-transform duration-200 ease-in-out
    fixed top-16 left-0 transform
    ${sidebarLeftOpen ? "translate-x-0" : "-translate-x-full"}
   `}
    >
      <nav className="flex flex-col space-y-2 p-4">
        {filteredItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setSidebarLeftOpen(false)}
            className="flex items-center gap-2 p-2 hover:bg-orange-100 rounded"
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
      </nav>
    </aside>
  );
};

export default SidebarLeft;
