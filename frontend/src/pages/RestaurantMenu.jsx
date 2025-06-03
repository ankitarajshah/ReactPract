import React from "react";
import dummyMenu from "../constant/dummyMenu.json";
import CustomButton from "../components/common/CustomButton";
import { useCart } from "../context/CartContext";

const RestaurantMenu = () => {
  const { addToCart } = useCart();
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
          <CustomButton onClick={() => addToCart(item)}>Add</CustomButton>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import dummyMenu from "../constant/dummyMenu.json";
// import axios from "axios";
// import CustomButton from "../components/common/CustomButton";
// import { useCart } from "../context/CartContext";

// const RestaurantMenu = () => {
//   const [restaurantName, setRestaurantName] = useState("");
//   const [menuCategories, setMenuCategories] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   const { addToCart, removeFromCart, cart } = useCart();
//   const cartContext = useCart();
//   console.log("Cart context in RestaurantMenu:", cartContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(
//           `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.0579765&lng=72.6461611&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
//         );
//         const cards = res.data?.data?.cards || [];
//         const text = cards[0]?.card?.card?.text || "Unknown Restaurant";
//         setRestaurantName(text);

//         const groupedCards =
//           cards.find((card) => card.groupedCard)?.groupedCard?.cardGroupMap
//             ?.REGULAR?.cards || [];
//         console.log({ groupedCards });
//         const itemCategories = groupedCards.filter(
//           (card) =>
//             card.card?.card?.["@type"] ===
//             "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
//         );
//         console.log({ itemCategories });
//         const allCarouselItems = groupedCards
//   .filter(gc => gc.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.MenuCarousel")
//   .flatMap(gc => gc.card.card.carousel || []);

// console.log(allCarouselItems);
//         setMenuCategories(itemCategories);
//       } catch (err) {
//         setError("Failed to load menu data");
//         setRestaurantName("");
//         setMenuCategories([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const formatPrice = (price) => {
//     if (!price) return "N/A";
//     return `₹${(price / 100).toFixed(2)}`;
//   };

//   if (loading) return <p>Loading menu...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">{restaurantName}</h1>
//       {menuCategories.length === 0 && (
//         <p className="text-gray-500">No menu items available.</p>
//       )}
//       {menuCategories.map((categoryCard, idx) => {
//         const category = categoryCard.card.card;
//         return (
//           <div key={idx} className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {category.itemCards?.map((itemCard) => {
//                 const item = itemCard.card.info;
//                 return (
//                   <div
//                     key={item.id}
//                     className="border p-4 rounded shadow hover:shadow-lg transition"
//                   >
//                     <h3 className="font-medium">{item.name}</h3>
//                     <p className="text-sm text-gray-600 mb-2">
//                       {item.description}
//                     </p>
//                     <p className="text-sm font-semibold">
//                       {formatPrice(item.price || item.defaultPrice)}
//                     </p>
//                     {item.imageId && (
//                       <img
//                         src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
//                         alt={item.name}
//                         className="w-full h-32 object-cover mt-2 rounded"
//                       />
//                     )}
//                     <CustomButton onClick={() => addToCart(item)}>
//                       Add
//                     </CustomButton>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default RestaurantMenu;
