import React, { useEffect, useState } from "react";
import BannerCard from "./BannerCard";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
const BannerList = () => {
  const swiggyApi = import.meta.env.VITE_SWIGGY_API;
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    axios
      .get(swiggyApi)
      .then((res) => {
        const bannerData =
          res.data?.data?.cards?.[0].card?.card?.imageGridCards?.info || [];
        setBanners(bannerData);
      })
      .catch((err) => {
        console.error("Error fetching banners:", err);
      });
  }, [swiggyApi]);

  return (
    <>
      <h1>BannerList</h1>
      {/* <div className="grid grid-cols-3 gap-4">
        {banners.length === 0 ? (
          <p>No banners found.</p>
        ) : (
          banners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))
        )}
      </div> */}

      {banners.length === 0 ? (
        <p>No banners found</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 8 },
          }}
        >
          {" "}
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <BannerCard banner={banner} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default BannerList;
