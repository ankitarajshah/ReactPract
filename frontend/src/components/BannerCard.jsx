import React from "react";
import { Link } from "react-router-dom";

const BannerCard = ({ banner }) => {
  if (!banner) return null;

  const { imageId, action, accessibility } = banner;
  const imgBannerUrl = import.meta.env.VITE_SWIGGY_IMAGE_BANNER;

  return (
    <>
      <Link
        to={action.link}
        className=""
        aria-label={accessibility.altText}
        target={action.link.startsWith("http") ? "_blank" : undefined}
        rel={action.link.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        <img
          src={`${imgBannerUrl}${imageId}`}
          alt={accessibility.altText}
          width={144}
          height={180}
        />
        <div className="mt-2 text-center font-semibold">{action.text}</div>
      </Link>
    </>
  );
};

export default BannerCard;
