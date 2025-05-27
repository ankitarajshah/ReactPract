import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/common/RestaurantCard";
import SearchBar from "../components/common/SearchBar";
import { useLocation, useSearchParams } from "react-router-dom";
import SectionHeader from "../components/common/SectionHeader";
import CustomSwiper from "../components/common/CustomSwiper";
import BannerCard from "../components/common/BannerCard";
import useRestaurants from "../hooks/useRestaurants";
const swiggyApi = import.meta.env.VITE_SWIGGY_API;

const RestaurantList = () => {
  // const [restaurants, setRestaurants] = useState([]);
  // const [mindRes, setMindRes] = useState([]);
  // const [listRes, setListRes] = useState([]);
  // const [loading, setLoading] = useState(true);

  const { restaurants, mindRestaurants, listRestaurants, loading } =
    useRestaurants();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  console.log({ query });
  const location = useLocation();

  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try {
  //       const res = await fetch(swiggyApi);
  //       const data = await res.json();
  //       const cards = data?.data?.cards || [];

  //       const restaurantsFromCards = cards.flatMap(
  //         (card) =>
  //           card?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
  //       );

  //       const mindCards =
  //         data?.data?.cards[0]?.card?.card?.imageGridCards?.info || [];

  //       setRestaurants(restaurantsFromCards);
  //       setMindRes(mindCards);
  //       setListRes(restaurantsFromCards);
  //     } catch (error) {
  //       console.error("Error fetching restaurants:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRestaurants();
  // }, []);

  const filteredRestaurants = listRestaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes(query.toLowerCase())
  );
  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {location.pathname === "/search" && (
        <div className="flex justify-center mb-4">
          <SearchBar placeholder="Search restaurants..." />
        </div>
      )}
      <SectionHeader align="left">What's on your mind?</SectionHeader>

      <CustomSwiper
        items={mindRestaurants}
        renderItem={(banner) => <BannerCard key={banner.id} banner={banner} />}
      />

      <SectionHeader align="left">
        Top restaurant chains in Ahmedabad
      </SectionHeader>

      <CustomSwiper
        items={restaurants}
        renderItem={(restaurant) => (
          <RestaurantCard key={restaurant.info.id} restaurant={restaurant} />
        )}
      />
      <SectionHeader align="left">
        Restaurants with online food delivery in Ahmedabad
      </SectionHeader>

      <div className="flex flex-wrap justify-center gap-2">
        {(location.pathname === "/search"
          ? filteredRestaurants
          : listRestaurants
        ).map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
