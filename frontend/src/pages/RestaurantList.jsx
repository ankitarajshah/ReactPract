import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";

const swiggyApi = import.meta.env.VITE_SWIGGY_API;
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

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

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-6">
        Restaurants Near You
      </h2>
      {restaurants.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {restaurants.map((restaurant, index) => (
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

// import React, { useEffect, useState } from "react";

// const swiggyApi = import.meta.env.VITE_SWIGGY_API;
// const imageBaseUrl = import.meta.env.VITE_SWIGGY_IMAGE_BASE;

// const RestaurantList = () => {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     fetch(swiggyApi)
//       .then((res) => res.json())
//       .then((data) => {
//         const cards = data?.data?.cards || [];
//         const restaurantCards = cards.flatMap(
//           (card) =>
//             card?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
//         );
//         setRestaurants(restaurantCards);
//       })
//       .catch((err) => console.error("Error fetching restaurants:", err));
//   }, []);

//   return (
//     <div>
//       <h2>Restaurants Near You</h2>
//       {restaurants.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {restaurants.map((restaurant, index) => (
//             <li key={`${restaurant.info.id}-${index}`}>
//               <strong>{restaurant.info.name}</strong> –{" "}
//               {restaurant.info.cuisines.join(", ")}
//               <div>
//                 <img
//                   src={`${imageBaseUrl}${restaurant.info.cloudinaryImageId}`}
//                   alt={restaurant.info.name}
//                   width="200"
//                 />
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RestaurantList;
