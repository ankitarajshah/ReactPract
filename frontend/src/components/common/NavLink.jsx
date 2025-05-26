import React from "react";
import { ShoppingCart, HelpCircle, Percent } from "lucide-react";
import NavItem from "./NavItem";

const navItems = [
  { to: "/other", label: "Other" },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/signin", label: "Sign In" },
  { to: "/help", label: "Help", icon: HelpCircle },
  {
    to: "/offers",
    label: "Offers",
    icon: Percent,
    highlight: true,
    badge: "NEW",
  },
  { to: "/corporate", label: "Swiggy Corporate" },
];

const NavLinks = ({ onClick = () => {} }) => {
  return (
    <>
      {navItems.map((item) => {
        console.log(item);
        return <NavItem key={item.to} {...item} onClick={onClick} />;
      })}
    </>
  );
};

export default NavLinks;


// components/NavLinks.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart, HelpCircle, Percent } from "lucide-react";

// const navItems = [
//   { to: "/other", label: "Other", roles: ["guest", "user", "admin"] },
//   { to: "/cart", label: "Cart", icon: ShoppingCart, roles: ["user"] },
//   { to: "/signin", label: "Sign In", roles: ["guest"] },
//   { to: "/help", label: "Help", icon: HelpCircle, roles: ["guest", "user", "admin"] },
//   {
//     to: "/offers",
//     label: "Offers",
//     icon: Percent,
//     highlight: true,
//     badge: "NEW",
//     roles: ["user", "admin"],
//   },
//   { to: "/corporate", label: "Swiggy Corporate", roles: ["admin"] },
// ];

// const NavLinks = ({ roles = [], onClick = () => {} }) => {
//   const isAllowed = (linkRoles) =>
//     !linkRoles || linkRoles.some((role) => roles.includes(role));

//   return (
//     <>
//       {navItems
//         .filter((item) => isAllowed(item.roles))
//         .map((item) => (
//           <Link
//             key={item.to}
//             to={item.to}
//             onClick={onClick}
//             className={`flex items-center space-x-1 hover:text-orange-500 ${
//               item.highlight ? "text-orange-600 font-semibold" : ""
//             }`}
//           >
//             {item.icon && <item.icon className="w-4 h-4 mr-1" />}
//             <span>{item.label}</span>
//             {item.badge && (
//               <span className="ml-1 text-xs bg-red-500 text-white rounded px-1">
//                 {item.badge}
//               </span>
//             )}
//           </Link>
//         ))}
//     </>
//   );
// };

// export default NavLinks;
// 