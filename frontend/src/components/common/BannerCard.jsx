import React from "react";
import { Link } from "react-router-dom";

const BannerCard = ({ banner }) => {
  if (!banner) return null;

  const { imageId, action, accessibility } = banner;
  const imgBannerUrl = import.meta.env.VITE_SWIGGY_IMAGE_BANNER;

  // Fallbacks for safety
  const link = action?.link || "#";
  const text = action?.text || "";
  const altText = accessibility?.altText || "Banner image";
  const isExternal = link.startsWith("http");

  // Compose full image URL
  const imgSrc = `${imgBannerUrl}${imageId}`;

  if (isExternal) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={altText}
        className="block"
      >
        <img src={imgSrc} alt={altText} width={144} height={180} />
        {text && <div className="mt-2 text-center font-semibold">{text}</div>}
      </a>
    );
  }

  return (
    <Link to={link} aria-label={altText} className="block">
      <img src={imgSrc} alt={altText} width={144} height={180} />
      {text && <div className="mt-2 text-center font-semibold">{text}</div>}
    </Link>
  );
};

export default BannerCard;
