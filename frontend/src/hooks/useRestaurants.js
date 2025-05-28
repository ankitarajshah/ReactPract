import React, { useEffect, useState } from "react";

const swiggyApi = import.meta.env.VITE_SWIGGY_API;

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [mindRestaurants, setMindRestaurants] = useState([]);
  const [listRestaurants, setListRestaurants] = useState([]);
  const [filterConfig, setFilterConfig] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(swiggyApi);
        const data = await res.json();

        const cards = data?.data?.cards || [];

        const restaurantsFromCards = cards.flatMap(
          (card) =>
            card?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
        );

        const mindCards =
          data?.data?.cards[0]?.card?.card?.imageGridCards?.info || [];

        const filterCon = data?.data?.cards[3]?.card?.card;

        console.log({ cards, mindCards, listRestaurants, filterCon });
        setRestaurants(restaurantsFromCards);
        setMindRestaurants(mindCards);
        setListRestaurants(restaurantsFromCards);
        setFilterConfig(filterCon);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return {
    restaurants,
    mindRestaurants,
    listRestaurants,
    loading,
    filterConfig,
  };
};

export default useRestaurants;
