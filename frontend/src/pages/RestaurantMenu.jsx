import React from "react";
import dummyMenu from "../constant/dummyMenu.json";
const RestaurantMenu = () => {
  return (
    <div className="menu-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
      {dummyMenu.map((item) => (
        <div
          key={item.id}
          className="menu-item border p-4 rounded shadow-md max-w-xs mx-auto"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-bold mt-2">{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
          <p className="font-semibold mt-1">
            ₹ {(item.price / 100).toFixed(2)}
          </p>
          <p className="mt-1">{item.isVeg ? "🌱 Veg" : "🍗 Non-Veg"}</p>
          {item.offerTags?.map((offer, i) => (
            <div
              key={i}
              style={{
                color: offer.textColor,
                backgroundColor: offer.backgroundColor,
              }}
              className="inline-block px-2 py-1 mt-2 rounded font-semibold text-sm"
            >
              {offer.title} - {offer.subTitle}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
