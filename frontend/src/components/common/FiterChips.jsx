import React from "react";
import { Chip } from "@mui/material";

const FilterChips = ({ selectedOptions = [],allOptions, onDelete }) => {
  return (
    <>
      {selectedOptions.map((label, index) => (
        <Chip
          key={index}
          label={label}
          onDelete={() => onDelete(label)}
          color="primary"
          variant="outlined"
          size="small"
        />
      ))}
    </>
  );
};

export default FilterChips;
