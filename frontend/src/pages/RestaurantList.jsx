import React, { useEffect, useState, useMemo } from "react";
import RestaurantCard from "../components/common/RestaurantCard";
import SearchBar from "../components/common/SearchBar";
import { useLocation, useSearchParams } from "react-router-dom";
import SectionHeader from "../components/common/SectionHeader";
import CustomSwiper from "../components/common/CustomSwiper";
import BannerCard from "../components/common/BannerCard";
import useRestaurants from "../hooks/useRestaurants";
import CustomButton from "../components/common/CustomButton";
import { TextSearch } from "lucide-react";
import CustomModal from "../components/common/CustomModal";
import CustomFilter from "../components/common/CustomFilter";
import FilterChips from "../components/common/FiterChips";

const swiggyApi = import.meta.env.VITE_SWIGGY_API;

const RestaurantList = () => {
  // const [restaurants, setRestaurants] = useState([]);
  // const [mindRes, setMindRes] = useState([]);
  // const [listRes, setListRes] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(null);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [vegNonVeg, setVegNonVeg] = useState(null);
  const deliveryTimeMap = {
    "Fast Delivery": 30,
    "Standard Delivery": 60,
    "Slow Delivery": 90,
  };
  const {
    restaurants,
    mindRestaurants,
    listRestaurants,
    loading,
    filterConfig,
  } = useRestaurants();
  const FILTER_SECTIONS = [
    "Sort",
    "Delivery Time",
    "Cuisines",
    "Explore",
    "Ratings",
    "Veg/Non-Veg",
    "Offers",
    "Cost for two",
  ];
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  console.log({ query });
  const location = useLocation();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [open, setOpen] = useState(false);
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
  const applyFilters = (restaurants) => {
    let filtered = [...restaurants];
    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((r) =>
        selectedCuisines.some((cuisine) => r.info?.cuisines?.includes(cuisine))
      );
    }
    if (selectedRatings.length > 0) {
      if (selectedRatings.length > 0) {
        filtered = filtered.filter((r) => {
          const rating = r.info?.avgRating ?? r.info?.rating;
          return selectedRatings.includes(rating.toFixed(1));
        });
      }
    }
    if (selectedDeliveryTime) {
      const maxDelivery = deliveryTimeMap[selectedDeliveryTime];
      if (maxDelivery !== undefined) {
        filtered = filtered.filter(
          (r) =>
            typeof r.info?.sla?.deliveryTime === "number" &&
            r.info.sla.deliveryTime <= maxDelivery
        );
      } else {
        console.warn("Unknown delivery time label:", selectedDeliveryTime);
      }
    }
    if (vegNonVeg) {
      filtered = filtered.filter((r) =>
        vegNonVeg === "veg" ? r.info?.veg === true : r.info?.veg === false
      );
    }
    if (selectedSort) {
      switch (selectedSort) {
        case "rating":
          filtered.sort(
            (a, b) => (b.info?.avgRating || 0) - (a.info?.avgRating || 0)
          );
          break;
        case "deliveryTime":
          filtered.sort(
            (a, b) =>
              (a.info?.sla?.deliveryTime || 0) -
              (b.info?.sla?.deliveryTime || 0)
          );
          break;

        default:
          break;
      }
    }
    if (query) {
      filtered = filtered.filter((r) =>
        r.info?.name?.toLowerCase().includes(query.toLowerCase())
      );
    }
    return filtered;
  };
  // const filteredRestaurants = listRestaurants.filter((restaurant) =>
  //   restaurant?.info?.name?.toLowerCase().includes(query.toLowerCase())
  // );
  const handleRemoveFilter = (filterLabel) => {
    if (filterLabel.startsWith("Sort: ")) {
      setSelectedSort(null);
    } else if (filterLabel.startsWith("Delivery Time: ")) {
      setSelectedDeliveryTime(null);
    } else if (filterLabel.startsWith("Cuisine: ")) {
      const cuisine = filterLabel.replace("Cuisine: ", "");
      setSelectedCuisines((prev) => prev.filter((c) => c !== cuisine));
    } else if (filterLabel.startsWith("Rating: ")) {
      const rating = filterLabel.replace("Rating: ", "");
      setSelectedRatings((prev) => prev.filter((r) => r !== rating));
    } else if (filterLabel.startsWith("Preference: ")) {
      setVegNonVeg(null);
    }
  };

  const filteredRestaurants = useMemo(
    () => applyFilters(listRestaurants),
    [
      listRestaurants,
      selectedSort,
      selectedCuisines,
      selectedDeliveryTime,
      selectedRatings,
      query,
      vegNonVeg,
    ]
  );
  useEffect(() => {
    const filters = [];
    if (selectedSort) filters.push(`Sort: ${selectedSort}`);
    if (selectedDeliveryTime)
      filters.push(`Delivery Time: ${selectedDeliveryTime}`);
    selectedCuisines.forEach((c) => filters.push(`Cuisine: ${c}`));
    selectedRatings.forEach((r) => filters.push(`Rating: ${r}`));
    if (vegNonVeg)
      filters.push(
        `Preference: ${vegNonVeg === "veg" ? "Vegetarian" : "Non-Vegetarian"}`
      );
    setSelectedFilters(filters);
  }, [
    selectedSort,
    selectedDeliveryTime,
    selectedCuisines,
    selectedRatings,
    vegNonVeg,
  ]);

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
        renderItem={(restaurant, index) => (
          <RestaurantCard
            key={`${restaurant.info.id}-${index}`}
            restaurant={restaurant}
          />
        )}
      />

      <SectionHeader align="left">
        Restaurants with online food delivery in Ahmedabad
      </SectionHeader>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <CustomButton
          label="Filter"
          variant="outlined"
          color="secondary"
          onClick={() => setOpen(true)}
          sx={{ minWidth: 100 }}
        >
          <TextSearch />
        </CustomButton>

        <div className="flex flex-wrap gap-2 max-w-full">
          <FilterChips
            allOptions={FILTER_SECTIONS}
            selectedOptions={selectedFilters}
            onDelete={handleRemoveFilter}
          />
        </div>
      </div>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Filter"
        content={
          <CustomFilter
            filterConfig={filterConfig}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            selectedCuisines={selectedCuisines}
            onCuisinesChange={setSelectedCuisines}
            selectedDeliveryTime={selectedDeliveryTime}
            onDeliveryTimeChange={setSelectedDeliveryTime}
            selectedRatings={selectedRatings}
            onRatingsChange={setSelectedRatings}
            vegNonVeg={vegNonVeg}
            onVegNonVegChange={setVegNonVeg}
          />
        }
        actions={
          <>
            <CustomButton onClick={() => setOpen(false)} color="inherit">
              Cancel
            </CustomButton>
            <CustomButton
              color="error"
              onClick={() => {
                setSelectedSort(null);
                setSelectedCuisines([]);
                setSelectedDeliveryTime(null);
                setSelectedRatings([]);
                setOpen(false); // Optionally close modal
                setVegNonVeg(null);
              }}
            >
              Clear All
            </CustomButton>

            <CustomButton
              onClick={() => {
                setOpen(false);
              }}
              variant="contained"
            >
              Apply
            </CustomButton>
          </>
        }
      ></CustomModal>
      {filteredRestaurants.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No restaurants found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
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
