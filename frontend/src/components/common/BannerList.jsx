import React, { useEffect, useState } from "react";
import BannerCard from "../common/BannerCard";
import axios from "axios";
import CustomSwiper from "../common/CustomSwiper";
import SectionHeader from "./SectionHeader";
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
      <SectionHeader>Popular Cuisines</SectionHeader>
      <CustomSwiper
        items={banners}
        renderItem={(banner) => <BannerCard banner={banner} />}
      />
    </>
  );
};

export default BannerList;
