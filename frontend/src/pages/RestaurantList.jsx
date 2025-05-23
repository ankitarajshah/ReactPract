import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { useSearchParams } from "react-router-dom";

const swiggyApi = import.meta.env.VITE_SWIGGY_API;
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  // const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("search") || "";

  useEffect(() => {
    fetch(swiggyApi)
      .then((res) => res.json())
      .then((data) => {
        const cards = data?.data?.cards || [];
        const restaurantCards = cards.flatMap(
          (card) =>
            card?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
        );
        setRestaurants(restaurantCards);
      })
      .catch((err) => console.error("Error fetching restaurants:", err));
  }, []);

  const filteredRestaurant = restaurants.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-6">
        Restaurants Near You
      </h2>
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchText}
          // onChange={(e) => setSearchText(e.target.value)}
          onChange={handleSearch}
          className="border border-gray-300 rounded p-2 w-full max-w-md"
        />
      </div>
      {restaurants.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredRestaurant.map((restaurant, index) => (
            <RestaurantCard
              key={`${restaurant.info.id}-${index}`}
              restaurant={restaurant}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;

