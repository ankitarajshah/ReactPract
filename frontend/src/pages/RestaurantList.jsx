import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { useOutletContext } from "react-router-dom";
const swiggyApi = import.meta.env.VITE_SWIGGY_API;
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { searchText } = useOutletContext(); // 👈 Use search from context

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
  const filteredRestaurants = restaurants.filter((r) =>
    r.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-6">
        Restaurants Near You
      </h2>
      {restaurants.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredRestaurants.map((restaurant, index) => (
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

