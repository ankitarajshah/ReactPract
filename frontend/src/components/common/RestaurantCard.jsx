import React from "react";
import { Link } from "react-router-dom";
const imageBaseUrl = import.meta.env.VITE_SWIGGY_IMAGE_BASE;

const RestaurantCard = ({ restaurant }) => {
  const {
    id,
    name,
    cloudinaryImageId,
    locality,
    areaName,
    costForTwo,
    cuisines,
    avgRating,
    veg,
  } = restaurant.info;

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden w-72 m-4 border border-gray-200">
      <img
        src={`${imageBaseUrl}${cloudinaryImageId}`}
        alt={name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">
          {locality}, {areaName}
        </p>
        <p className="text-sm mt-1">
          <span className="font-medium">Cuisines:</span> {cuisines.join(", ")}
        </p>
        <p className="text-sm">
          <span className="font-medium">Cost:</span> {costForTwo}
        </p>
        <p className="text-sm">
          <span className="font-medium">Rating:</span> ⭐ {avgRating}
        </p>
        {veg && (
          <span className="inline-block mt-2 px-2 py-1 text-green-700 bg-green-100 text-xs font-semibold rounded">
            🌱 Pure Veg
          </span>
        )}
      </div>
      <Link
        to={`/restaurant/${id}`}
        className="text-blue-600 hover:underline mt-2 inline-block"
      >
        View Menu
      </Link>
    </div>
  );
};

export default RestaurantCard;
