import React from "react";
import { X } from "lucide-react";
import { filterByRole } from "../../utils/filterByRole";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const SidebarRight = ({
  items,
  roles,
  sidebarRightOpen,
  setSidebarRightOpen,
}) => {
  const filteredItems = filterByRole(items, roles);

  return (
    <aside
      className={`fixed top-16 right-0 w-48 h-full bg-gray-50 shadow-md z-30 transform transition-transform duration-200 ease-in-out
      ${sidebarRightOpen ? "translate-x-0" : "translate-x-full"} `}
    >
      {/* Close button for mobile */}
      <button
        className="absolute top-2 right-2 md:hidden"
        onClick={() => setSidebarRightOpen(false)}
      >
        <X className="h-5 w-5 text-gray-600" />
      </button>

      <nav className="flex flex-col space-y-2 p-4">
        {filteredItems.map((item) => {
          const isAction = typeof item.action === "function";

          return isAction ? (
            <button
              key={item.label}
              onClick={() => {
                item.action();
                setSidebarRightOpen(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-orange-100 rounded w-full text-left"
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setSidebarRightOpen(false)}
              className="flex items-center gap-2 p-2 hover:bg-orange-100 rounded"
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarRight;
