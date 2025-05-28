import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  RadioGroup,
  Radio,
  Checkbox,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import useRestaurants from "../../hooks/useRestaurants";

const FILTER_SECTIONS = [
  "Sort",
  "Delivery Time",
  "Cuisines",
  "Explore",
  "Ratings",
  "Veg/Non-Veg",
  "Offers",
  "Cost for two",
];

const CustomFilter = () => {
  const [activeSection, setActiveSection] = useState("Sort");
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(null);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const { filterConfig } = useRestaurants();

  const facet = filterConfig?.facetList?.find((f) => f.label === activeSection);

  const renderOptions = () => {
    switch (activeSection) {
      case "Sort":
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort by</FormLabel>
            <RadioGroup
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              {filterConfig?.sortConfigs?.length ? (
                filterConfig.sortConfigs.map((option) => (
                  <FormControlLabel
                    key={option.key}
                    label={option.title}
                    control={<Radio />}
                    value={option.key}
                  />
                ))
              ) : (
                <p>No sorting options available.</p>
              )}
            </RadioGroup>
          </FormControl>
        );

      case "Delivery Time":
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Delivery Time</FormLabel>
            <RadioGroup
              value={selectedDeliveryTime}
              onChange={(e) => setSelectedDeliveryTime(e.target.value)}
            >
              {facet?.facetInfo?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.label}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "Ratings":
        return (
          <Box>
            <FormLabel component="legend">Select Ratings</FormLabel>
            <List dense>
              {facet?.facetInfo?.map((option, index) => {
                const label = option.label;
                const isChecked = selectedRatings.includes(label);

                const toggleRating = () => {
                  const newSelections = isChecked
                    ? selectedRatings.filter((r) => r !== label)
                    : [...selectedRatings, label];
                  setSelectedRatings(newSelections);
                };

                return (
                  <ListItem disablePadding key={index}>
                    <ListItemButton onClick={toggleRating}>
                      <ListItemIcon>
                        <Checkbox
                          edge="end"
                          checked={isChecked}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            "aria-label": `Select rating ${label}`,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        );

      case "Cuisines":
        return (
          <Box>
            <FormLabel component="legend">Select Cuisines</FormLabel>
            <List dense>
              {facet?.facetInfo?.map((option, index) => {
                const label = option.label;
                const isChecked = selectedCuisines.includes(label);

                const toggleCuisine = () => {
                  const newSelections = isChecked
                    ? selectedCuisines.filter((c) => c !== label)
                    : [...selectedCuisines, label];
                  setSelectedCuisines(newSelections);
                };

                return (
                  <ListItem disablePadding key={index}>
                    <ListItemButton onClick={toggleCuisine}>
                      <ListItemIcon>
                        <Checkbox
                          edge="end"
                          checked={isChecked}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            "aria-label": `Select cuisine ${label}`,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        );

      default:
        return <p>Options for "{activeSection}" not implemented yet.</p>;
    }
  };

  return (
    <Box display="flex" flexWrap="wrap">
      <Box width="200px" border="1px solid #ccc" p={2}>
        <List>
          {FILTER_SECTIONS.map((f) => (
            <ListItem key={f} disablePadding>
              <ListItemButton
                selected={activeSection === f}
                onClick={() => setActiveSection(f)}
              >
                <ListItemText primary={f} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ bgcolor: "background.paper", p: 2, flex: 1 }}>
        {renderOptions()}
      </Box>
    </Box>
  );
};

export default CustomFilter;
