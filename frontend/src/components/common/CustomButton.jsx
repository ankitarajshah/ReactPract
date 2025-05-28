import React from "react";
import { Button, Stack, Typography } from "@mui/material";

const CustomButton = ({
  label = "",
  variant = "contained",
  color = "primary",
  onClick,
  sx = {},
  children,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{ borderRadius: 2, textTransform: "none", ...sx }}
      {...rest}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {label && <Typography>{label}</Typography>}
        {children}
      </Stack>
    </Button>
  );
};

export default CustomButton;
