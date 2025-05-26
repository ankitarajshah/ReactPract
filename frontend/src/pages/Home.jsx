import React from "react";
import BannerList from "../components/common/BannerList";

const Home = () => {
  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Welcome to Swiggy Home!</h1>
        <h2 className="text-xl mt-2">What's on your mind?</h2>
      </header>

      {/* Banner carousel or grid */}
      <BannerList />

      {/* App download banner */}
      <div
        className="w-full h-auto mt-8"
        data-testid="get_swiggy_app_qr"
        role="banner"
      >
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/App_download_banner.png"
          alt="Get the Swiggy App banner"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
