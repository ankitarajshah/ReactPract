import React from "react";

const SectionHeader = ({
  children,
  className = "",
  align = "center",
  level = 2,
}) => {
  const Tag = `h${level}`;
  return (
    <Tag className={`text-2xl font-bold text-${align} my-6 ${className}`}>
      {children}
    </Tag>
  );
};

export default SectionHeader;
