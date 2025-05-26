import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Lucide icons

const CustomSwiper = ({
  items = [],
  renderItem,
  slidesPerView = 3,
  breakpoints = {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  },
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!items || items.length === 0) return <p>No items to display</p>;

  return (
    <div className="relative">
      {/* Top right navigation buttons */}
      <div className="absolute right-0 -top-10 flex gap-2 z-10">
        <button
          ref={prevRef}
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          ref={nextRef}
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={1}
        slidesPerView={slidesPerView}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={breakpoints}
        className="p-6"
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || index}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
