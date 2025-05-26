import React from "react";

const footerData = {
  company: [
    "About Us",
    "Swiggy Corporate",
    "Careers",
    "Team",
    "Swiggy One",
  ],
  services: [
    "Swiggy Instamart",
    "Swiggy Dineout",
    "Swiggy Genie",
    "Minis",
    "Pyng",
  ],
  support: [
    "Contact us",
    "Help & Support",
    "Partner with us",
    "Ride with us",
  ],
  legal: [
    "Terms & Conditions",
    "Cookie Policy",
    "Privacy Policy",
  ],
  locations: [
    "bangalore",
    "gurgaon",
    "hyderabad",
    "delhi",
    "mumbai",
    "pune",
  ],
  misc: [
    "685 cities",
    "Life at Swiggy",
    "Explore with Swiggy",
    "Swiggy News",
    "Snackables",
  ],
  social: [
    { name: "LinkedIn", url: "https://linkedin.com/company/swiggy" },
    { name: "Instagram", url: "https://instagram.com/swiggy" },
    { name: "Facebook", url: "https://facebook.com/swiggy" },
    { name: "Pinterest", url: "https://pinterest.com/swiggy" },
    { name: "Twitter", url: "https://twitter.com/swiggy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-5">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
        <div className="flex flex-col min-w-[150px]">
          <h4 className="text-white font-semibold mb-3">Company</h4>
          {footerData.company.map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-400 hover:text-white mb-1 text-sm"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex flex-col min-w-[150px]">
          <h4 className="text-white font-semibold mb-3">Services</h4>
          {footerData.services.map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-400 hover:text-white mb-1 text-sm"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex flex-col min-w-[150px]">
          <h4 className="text-white font-semibold mb-3">Support</h4>
          {footerData.support.map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-400 hover:text-white mb-1 text-sm"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex flex-col min-w-[150px]">
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          {footerData.legal.map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-400 hover:text-white mb-1 text-sm"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex flex-col min-w-[150px]">
          <h4 className="text-white font-semibold mb-3">Available in</h4>
          {footerData.locations.map((city) => (
            <a
              key={city}
              href="#"
              className="text-gray-400 hover:text-white mb-1 text-sm capitalize"
            >
              {city}
            </a>
          ))}
          <p className="text-gray-500 mt-2 text-xs">{footerData.misc[0]}</p>
        </div>

        <div className="flex flex-col min-w-[150px]">
          <h4 className="text-white font-semibold mb-3">Life at Swiggy</h4>
          {footerData.misc.slice(1).map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-400 hover:text-white mb-1 text-sm"
            >
              {item}
            </a>
          ))}

          <div className="mt-4">
            <h4 className="text-white font-semibold mb-2">Social Links</h4>
            {footerData.social.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white mb-1 text-sm block"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-10">
        © 2025 Swiggy Limited
      </div>
    </footer>
  );
}
