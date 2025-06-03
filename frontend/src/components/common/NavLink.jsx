import React from "react";
import { ShoppingCart, HelpCircle, Percent } from "lucide-react";
import NavItem from "./NavItem";

const navItems = [
  { to: "/other", label: "Other", roles: ["manager"] },
  { to: "/cart", label: "Cart", icon: ShoppingCart, roles: ["user", "admin"] },
  { to: "/signin", label: "Sign In" }, // no roles means public/guest
  {
    to: "/help",
    label: "Help",
    icon: HelpCircle,
    roles: ["superAdmin"],
  },
  {
    to: "/offers",
    label: "Offers",
    icon: Percent,
    highlight: true,
    badge: "NEW",
    roles: ["admin"],
  },
  { to: "/corporate", label: "Swiggy Corporate", roles: ["admin"] },
];

// Accept props object with roles and onClick
const NavLinks = ({ roles = [], onClick = () => {} }) => {
  // Helper function to check if link roles overlap user roles
  const isAllowed = (linkRoles) => {
    if (!linkRoles) return true; // no roles means open to all
    return linkRoles.some((role) => roles.includes(role));
  };

  return (
    <>
      {navItems
        .filter((item) => isAllowed(item.roles))
        .map((item) => (
          <NavItem key={item.to} {...item} onClick={onClick} />
        ))}
    </>
  );
};

export default NavLinks;
